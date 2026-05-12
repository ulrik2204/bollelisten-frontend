import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const clientDir = join(__dirname, "dist", "client");
const port = parseInt(process.env.PORT || "5000", 10);

const serverModule = await import("./dist/server/server.js");
const app = serverModule.default;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webp": "image/webp",
};

async function tryServeStatic(pathname, res) {
  if (pathname === "/") {return false;}
  const filePath = join(clientDir, pathname);
  if (!filePath.startsWith(clientDir)) {return false;}

  try {
    const content = await readFile(filePath);
    const contentType = MIME[extname(filePath)] || "application/octet-stream";
    const cacheControl = pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": content.byteLength,
      "Cache-Control": cacheControl,
    });
    res.end(content);
    return true;
  } catch {
    return false;
  }
}

function toWebRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value != null)
      {headers.set(key, Array.isArray(value) ? value.join(", ") : value);}
  }

  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req;
    init.duplex = "half";
  }
  return new Request(url, init);
}

async function sendWebResponse(webRes, res) {
  const headers = {};
  webRes.headers.forEach((v, k) => (headers[k] = v));
  res.writeHead(webRes.status, webRes.statusText, headers);

  if (webRes.body) {
    const reader = webRes.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {break;}
        res.write(value);
      }
    } finally {
      reader.releaseLock();
    }
  }
  res.end();
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" || req.method === "HEAD") {
    if (await tryServeStatic(url.pathname, res)) {return;}
  }

  try {
    const response = await app.fetch(toWebRequest(req));
    await sendWebResponse(response, res);
  } catch (err) {
    console.error("Server error:", err);
    if (!res.headersSent) {res.writeHead(500, { "Content-Type": "text/plain" });}
    res.end("Internal Server Error");
  }
}).listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
