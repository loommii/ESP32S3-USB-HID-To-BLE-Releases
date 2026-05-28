# Pairing & Switching

The bridge supports pairing with up to 3 Bluetooth hosts and switching between them.

## Device Names

Each slot has a unique BLE name:

| Slot | BLE Name |
|------|----------|
| 1 | **Loommii-HID-01** |
| 2 | **Loommii-HID-02** |
| 3 | **Loommii-HID-03** |

Each slot uses an **independent MAC address** — hosts see them as distinct physical devices. This means you can have all three slots paired simultaneously without conflicts.

## Pairing a New Device

1. Ensure the board is powered on with USB device(s) connected
2. The board automatically starts BLE advertising after USB initialization
3. On your target host, search for the corresponding device name (e.g., "Loommii-HID-01")
4. Select it — your host will display a **6-digit pairing code**
5. **Type the 6-digit code on your USB keyboard** and press **Enter**
6. The LED confirms successful pairing — you're ready to use

> Press **Esc** on your USB keyboard at any time during code entry to cancel pairing.

## Switching Between Hosts

Use the `Scroll Lock` key as a modifier:

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + 1` | Switch to Slot 1 |
| `Scroll Lock + 2` | Switch to Slot 2 |
| `Scroll Lock + 3` | Switch to Slot 3 |

The board will reboot and reconnect to the selected slot. **Persistent bonding** means it auto-reconnects — no re-pairing needed after the initial setup.

## Unpairing

To unpair the currently active device:

| Hotkey | Action |
|--------|--------|
| `Scroll Lock + Esc` | Unpair current device (clear bonding) |

This clears the bonding information for the active slot. You'll need to re-pair if you want to use that host again.

## LED Indications During Pairing

| State | LED |
|-------|-----|
| Advertising (ready to pair) | Blinking purple/blue/yellow |
| Pairing code entry | Solid purple |
| Connected and ready | Solid green/blue/yellow |

For a full list of LED states, see the [LED Status guide](/guide/led-status).
