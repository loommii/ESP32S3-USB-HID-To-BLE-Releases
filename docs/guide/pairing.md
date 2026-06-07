# Pairing & Switching

The bridge uses a single BLE identity and supports up to 3 hosts connected simultaneously, with fast switching between them.

> **Prerequisite**: The device must be provisioned (activated + WiFi configured) before it enters normal HID mode. See [Getting Started](/guide/getting-started) for first-time setup.

## Device Name

All connections share a single BLE device name:

| BLE Name |
|----------|
| **Loommii-HID** |

## Pairing a New Device

1. Ensure the board is powered on with USB device(s) connected and the LED shows **solid green** (normal mode)
2. On your target host, search for **"Loommii-HID"** in Bluetooth settings
3. Select it — your host will display a **6-digit pairing code**
4. **Type the 6-digit code on your USB keyboard** and press **Enter**
5. LED turns solid green — pairing successful, ready to use

> Press **Esc** on your USB keyboard at any time during code entry to cancel pairing.

## Connecting Additional Hosts

Simply search for **"Loommii-HID"** on a second (or third) computer and pair. Already-connected hosts will not be disconnected.

## Switching Between Hosts

Use the `Scroll Lock` key as a modifier:

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + 1` | Switch to connected host #1 |
| `Scroll Lock + 2` | Switch to connected host #2 |
| `Scroll Lock + 3` | Switch to connected host #3 |

Switching is instant — no reboot required. Paired hosts reconnect automatically.

## Unpairing

To unpair the currently active device:

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + Esc` | Unpair current device (clear bonding) |

This clears the bonding information for the active device. You'll need to re-pair if you want to use that host again.

## LED Indications During Pairing

| State | LED |
|-------|-----|
| Advertising (ready to pair) | Blinking purple |
| Pairing code entry | Solid purple |
| Connected and ready | Solid green |

For a full list of LED states, see the [LED Status guide](/guide/led-status).
