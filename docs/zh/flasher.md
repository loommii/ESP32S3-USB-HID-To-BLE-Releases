---
title: Web 烧录
head:
  - - script
    - type: module
      src: https://unpkg.com/esp-web-tools/dist/web/install-button.js?module
---

# Web 烧录

直接在浏览器中为您的 ESP32-S3 开发板烧录最新固件。

<div class="flasher-card">
  <esp-web-install-button manifest="../flasher/manifest.json"></esp-web-install-button>
  <p class="flasher-note">需要桌面版 Chrome 或 Edge 浏览器，并确保通过 HTTPS 访问。</p>
</div>

<style>
.flasher-card {
  text-align: center;
  background: #1a1a2e;
  border-radius: 12px;
  padding: 3rem 2rem;
  margin: 1.5rem 0;
}
.flasher-note {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #999;
}
</style>
