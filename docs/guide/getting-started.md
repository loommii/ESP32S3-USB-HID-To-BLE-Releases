# Getting Started

Follow these steps to set up your USB HID to BLE Bridge for the first time.

## What You'll Need

- ESP32-S3 board with the firmware installed
- A USB keyboard and/or mouse
- A Bluetooth-capable computer, phone, or tablet (for BLE HID usage)
- The [Desktop App](https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases/releases) (for initial setup, macOS / Windows)

## First-Time Setup (Provisioning)

On first boot (or after factory reset), the device enters **provisioning mode**. You must use the desktop app to complete activation and WiFi configuration.

### 1. Power On

Plug your USB keyboard and/or mouse into the ESP32-S3 board, then connect the board to power. The LED will show **solid red** — this means the USB is initializing.

### 2. Enter Provisioning Mode

Once the USB device is ready, the LED changes to **blinking purple** — the board is advertising for provisioning via BLE.

### 3. Open the Desktop App

Launch the desktop app (macOS / Windows). The app will automatically discover your device via BLE advertisement.

> The BLE advertisement embeds the device's real MAC address and status flags (activated / WiFi configured) so the app can identify it without connecting first.

### 4. Activate the Device

If the device is not yet activated, the app will prompt you for an **activation code**. Enter the code provided with your device.

- The activation code is an ECDSA P-256 signature bound to your device's unique MAC address
- Once verified, the code is stored in NVS — you only need to do this once
- The LED turns **solid purple** during activation

### 5. Configure WiFi

The app will scan for nearby WiFi networks. Select your network and enter the password. The device stores the WiFi credentials in NVS.

### 6. Provisioning Complete

Once both activation and WiFi are configured, the device **automatically reboots**. After reboot:

- LED shows **solid green** — the device is now in normal HID mode
- WiFi connects automatically using stored credentials
- The device is ready for BLE pairing with your hosts

## Connecting Hosts (Normal Operation)

After provisioning, the device operates as a standard BLE HID device. To connect your computers, phones, or tablets:

1. Search for **"Loommii-HID"** in your host's Bluetooth settings
2. Pair — your host will display a **6-digit pairing code**
3. **Type the 6-digit code on your USB keyboard** and press **Enter**
4. LED turns **solid green** — connected and ready

> Press **Esc** at any time during pairing code entry to cancel.

### Connect Additional Hosts

To connect a second or third host:

1. Simply search for **"Loommii-HID"** on the second computer and pair (the first host stays connected)
2. Repeat the pairing steps above
3. Press `Scroll Lock + 1` / `2` / `3` to switch between connected hosts

All hosts share a single BLE identity — no reboot or re-pairing needed.

## Hotkeys Reference

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + 1` | Switch to connected host #1 |
| `Scroll Lock + 2` | Switch to connected host #2 |
| `Scroll Lock + 3` | Switch to connected host #3 |
| `Scroll Lock + Esc` | Unpair current active device (clear bonding) |

## Upgrading from V2.x

V3.0.0 introduces a new provisioning and activation system. If you are upgrading from V2.x:

1. **Factory reset is required** — hold the reset button or use the desktop app's "Factory Reset" function
2. After factory reset, the device enters provisioning mode
3. Follow the first-time setup steps above to activate and configure WiFi
