# Getting Started

Follow these steps to set up your USB HID to BLE Bridge for the first time.

## What You'll Need

- ESP32-S3 board with the firmware installed
- A USB keyboard and/or mouse
- A Bluetooth-capable computer, phone, or tablet

## Step-by-Step Setup

### 1. Power On

Plug your USB keyboard and/or mouse into the ESP32-S3 board, then connect the board to power. The LED will show **solid red** — this means the USB is initializing.

### 2. BLE Advertising

Once the USB device is ready, the LED changes to **blinking purple** — the board is advertising as **"Loommii-HID"**.

### 3. Pair

On your computer or phone, search for available Bluetooth devices and select **"Loommii-HID"**. Your host will display a **6-digit pairing code**.

### 4. Enter the Pairing Code

**Type the 6-digit code on your USB keyboard** and press **Enter**. The LED will change to **solid purple** while waiting for input.

> Press **Esc** at any time during pairing code entry to cancel pairing.

### 5. Ready to Use

Once paired, the LED turns **solid green** — normal operation.

You're all set — your wired USB devices are now wireless!

### 6. Connect Additional Hosts

To connect a second or third host:

1. Simply search for **"Loommii-HID"** on the second computer and pair (the first host stays connected)
2. Repeat the pairing steps 3–5
3. Press `Scroll Lock + 1` / `2` / `3` to switch between connected hosts

All hosts share a single BLE identity — no reboot or re-pairing needed.

## Hotkeys Reference

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + 1` | Switch to connected host #1 |
| `Scroll Lock + 2` | Switch to connected host #2 |
| `Scroll Lock + 3` | Switch to connected host #3 |
| `Scroll Lock + Esc` | Unpair current active device (clear bonding) |
