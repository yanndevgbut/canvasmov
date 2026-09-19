import crypto from "crypto";

const KEY = "nV2t6sQ8JzWyXCMkURa4BEfDq1oZLgMb";
const IV = "W9pYdK3eRuBvMzQ2";
const PKG = "com.nano.art.ai.generator";
const BASE = "https://nano-banana.leansoft-ai.com";

export type Ratio = "1:1" | "16:9" | "9:16";

export interface GenerateResult {
  success: true;
  taskId: string;
  urls: string[];
}

function makeAuth(): string {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60;
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(KEY, "utf8"),
    Buffer.from(IV, "utf8")
  );
  return Buffer.concat([
    cipher.update(`${now}||${PKG}||${exp}`, "utf8"),
    cipher.final(),
  ]).toString("base64");
}

function makeDevId(): string {
  return crypto.randomBytes(8).toString("hex");
}

function makeFcm(): string {
  return `${crypto.randomBytes(16).toString("base64url")}:${crypto.randomBytes(100).toString("base64url")}`;
}

function makeHeaders(devId: string, fcm: string, extra: Record<string, string> = {}): Record<string, string> {
  return {
    "User-Agent": "okhttp/4.12.0",
    "Accept-Encoding": "gzip",
    "x-client-auth": makeAuth(),
    "device-id": devId,
    "app-user-id": "",
    "app-version": "1.8.5",
    "version-code": "85",
    "language-code": "en",
    "app-id": "com.nano.banana",
    "os-type": "android",
    ...extra,
  };
}

async function createTask(prompt: string, ratio: Ratio, devId: string, fcm: string): Promise<string> {
  const res = await fetch(`${BASE}/image/createTask`, {
    method: "POST",
    headers: makeHeaders(devId, fcm, {
      "Content-Type": "application/json",
      fcm_token: fcm,
    }),
    body: JSON.stringify({ materialId: prompt, ratio }),
  });

  if (!res.ok) {
    throw new Error(`Generation server error (HTTP ${res.status})`);
  }

  const json = await res.json().catch(() => null);
  if (!json) {
    throw new Error("Invalid response received from generation server");
  }

  const taskId = json?.data?.taskId;
  if (!taskId) {
    const errorMsg = json?.msg || json?.message || "Failed to initiate task with generation server";
    throw new Error(errorMsg);
  }
  return taskId;
}

async function pollTask(taskId: string, devId: string, fcm: string): Promise<string[]> {
  const maxAttempts = 18;
  const pollIntervalMs = 2500;
  const startTime = Date.now();
  const maxTotalWaitMs = 48000; // Safety buffer under Vercel 60s timeout

  for (let i = 0; i < maxAttempts; i++) {
    if (Date.now() - startTime > maxTotalWaitMs) {
      break;
    }

    await new Promise((r) => setTimeout(r, pollIntervalMs));

    try {
      const res = await fetch(`${BASE}/image/checkTask`, {
        method: "POST",
        headers: makeHeaders(devId, fcm, { "Content-Type": "application/json" }),
        body: JSON.stringify({
          accessKey: "",
          is_regenerate: false,
          model_type: "v_fuse",
          secretKey: "",
          taskId,
        }),
      });

      if (!res.ok) continue;

      const json = await res.json().catch(() => null);
      if (!json) continue;

      const data = json?.data || {};
      const state: string = data.state || "processing";

      if (state === "success" && data.resultJson) {
        try {
          const parsed = JSON.parse(data.resultJson);
          const urls: string[] = parsed?.resultUrls?.filter(Boolean) || [];
          if (urls.length > 0) return urls;
        } catch {
          // resultJson parse error, continue polling or fallback
        }
      }

      if (state === "failed") {
        const failReason = data.failReason || data.failMsg || json?.msg || "Image generation was rejected or failed on the server";
        throw new Error(failReason);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("rejected") || msg.includes("failed on the server")) {
        throw err;
      }
      // Transient network error — continue next polling attempt
    }
  }

  throw new Error("Generation timed out. The server may be experiencing high demand. Please try again.");
}

export async function generateImage(prompt: string, ratio: Ratio): Promise<GenerateResult> {
  const devId = makeDevId();
  const fcm = makeFcm();
  const taskId = await createTask(prompt, ratio, devId, fcm);
  const urls = await pollTask(taskId, devId, fcm);
  return { success: true, taskId, urls };
}
