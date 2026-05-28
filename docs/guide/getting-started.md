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

Once the USB device is ready, the LED changes to a blinking pattern:

| Connected Device | LED Color |
|-----------------|-----------|
| Keyboard only | Blinking purple |
| Mouse only | Blinking blue |
| Keyboard + mouse | Blinking yellow |

The board is now broadcasting as a Bluetooth device.

### 3. Pair

On your computer or phone, search for available Bluetooth devices and select **"Loommii-HID-01"**. Your host will display a **6-digit pairing code**.

### 4. Enter the Pairing Code

**Type the 6-digit code on your USB keyboard** and press **Enter**. The LED will change to **solid purple** while waiting for input.

> Press **Esc** at any time during pairing code entry to cancel pairing.

### 5. Ready to Use

Once paired, the LED turns to a solid color confirming the connection:

| Connected Device | LED Color |
|-----------------|-----------|
| Keyboard only | Solid green |
| Mouse only | Solid blue |
| Keyboard + mouse | Solid yellow |

You're all set — your wired USB devices are now wireless!

### 6. Pair Additional Hosts

To pair a second or third host:

1. Press `Scroll Lock + 2` (or `Scroll Lock + 3`) to switch to the next slot
2. On the target device, search for **"Loommii-HID-02"** (or **"-03"**)
3. Repeat the pairing steps 3–5

Each slot uses its own MAC address — hosts see them as distinct physical devices.

## Hotkeys Reference

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + 1` | Switch to Slot 1 |
| `Scroll Lock + 2` | Switch to Slot 2 |
| `Scroll Lock + 3` | Switch to Slot 3 |
| `Scroll Lock + Esc` | Unpair current device (clear bonding) |
