const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // 如果 URL 包含 /Phantasia，去掉它
  if (pathname.startsWith("/Phantasia")) {
    pathname = pathname.replace("/Phantasia", ""); // 去掉前綴
  }

  // 如果是根路徑，返回 index.html
  if (pathname === "/" || pathname === "/index.html") {
    const filePath = path.join(__dirname, "dist", "index.html");
    serveFile(filePath, res);
  }
  // 處理靜態資源
  else {
    const filePath = path.join(__dirname, "dist", pathname);

    fs.exists(filePath, (exists) => {
      if (exists) {
        serveFile(filePath, res);
      } else {
        res.statusCode = 404;
        res.end("404 Not Found");
      }
    });
  }
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  let contentType = "application/octet-stream";
  let cacheControl = "no-store"; // 默認不快取

  // 根據文件類型設置 MIME 類型和 Cache-Control
  if (ext === ".html") {
    contentType = "text/html";
    cacheControl = "public, max-age=0"; // HTML 頁面一般不會長時間快取
  } else if (ext === ".css") {
    contentType = "text/css";
    cacheControl = "public, max-age=31536000, immutable"; // CSS 設置長時間快取
  } else if (ext === ".js") {
    contentType = "application/javascript";
    cacheControl = "public, max-age=31536000, immutable"; // JS 設置長時間快取
  } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    contentType = "image/jpeg"; // 或 'image/png'
    cacheControl = "public, max-age=31536000, immutable"; // 圖片設置長時間快取
  }

  // 設置 MIME 類型和 Cache-Control 標頭
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", cacheControl);

  // 讀取並返回文件
  fs.createReadStream(filePath).pipe(res);
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
