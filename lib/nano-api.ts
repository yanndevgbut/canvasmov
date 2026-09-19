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
    throw new Error(`createTask HTTP ${res.status}`);
  }

  const json = await res.json();
  const taskId = json?.data?.taskId;
  if (!taskId) {
    throw new Error(`No taskId in response: ${JSON.stringify(json)}`);
  }
  return taskId;
}

async function pollTask(taskId: string, devId: string, fcm: string): Promise<string[]> {
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000));

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

      const json = await res.json();
      const data = json?.data || {};
      const state: string = data.state || "processing";

      if (state === "success" && data.resultJson) {
        const parsed = JSON.parse(data.resultJson);
        const urls: string[] = parsed?.resultUrls?.filter(Boolean) || [];
        if (urls.length > 0) return urls;
      }

      if (state === "failed") {
        throw new Error("Task failed on server side");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === "Task failed on server side") throw err;
      // transient error — continue polling
    }
  }
  throw new Error("Timeout: image generation took too long");
}

export async function generateImage(prompt: string, ratio: Ratio): Promise<GenerateResult> {
  const devId = makeDevId();
  const fcm = makeFcm();
  const taskId = await createTask(prompt, ratio, devId, fcm);
  const urls = await pollTask(taskId, devId, fcm);
  return { success: true, taskId, urls };
}
