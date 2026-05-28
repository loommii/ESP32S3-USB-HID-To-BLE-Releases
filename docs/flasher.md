---
title: Web Flasher
head:
  - - script
    - type: module
      src: https://unpkg.com/esp-web-tools/dist/web/install-button.js?module
---

# Web Flasher

Flash the latest firmware to your ESP32-S3 board directly from the browser.

<div class="flasher-card">
  <esp-web-install-button manifest="/ESP32S3-USB-HID-To-BLE-Releases/flasher/manifest.json"></esp-web-install-button>
  <p class="flasher-note">Requires Chrome or Edge on desktop with HTTPS.</p>
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
