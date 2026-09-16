<div align="center">

# Image Sorter

### Sort photos and videos at keyboard speed.

A lightweight desktop app for quickly reviewing large media folders and copying files into up to **9 destination folders** — without touching your originals.

<br>

[![Download for Windows](https://img.shields.io/badge/Download_for_Windows-Latest_Release-2ea44f?style=for-the-badge&logo=windows)](https://github.com/zautomation-real/image-sorter/releases/latest)
[![GitHub Release](https://img.shields.io/github/v/release/zautomation-real/image-sorter?style=for-the-badge&label=Version)](https://github.com/zautomation-real/image-sorter/releases)
[![License](https://img.shields.io/github/license/zautomation-real/image-sorter?style=for-the-badge)](https://github.com/zautomation-real/image-sorter)

**Windows · Portable · Local-first · No installation required**

</div>

---

## Why Image Sorter?

Sometimes you don't need AI, tags, databases, libraries or another photo-management system.

You just need to look at a file and decide:

> **Which folder does this belong in?**

Image Sorter is built around that single workflow.

Choose a folder, assign destinations to keys **1–9**, and start sorting. Every keypress copies the current file to its destination and immediately moves you to the next one.

**Your originals stay untouched.** Image Sorter copies files into destination folders instead of moving or deleting the source files.

---

## Quick start

### 1. Choose your source folder

Click **Choose folder** and select the folder containing the photos and videos you want to sort.

### 2. Set your destinations

Assign up to **9 destination folders**.

Each destination corresponds to its number key:

| Key | Destination |
|:---:|---|
| `1` | Destination 1 |
| `2` | Destination 2 |
| `3` | Destination 3 |
| `…` | … |
| `9` | Destination 9 |

Once selected, Image Sorter shows the folder name directly in the interface.

### 3. Sort

Review the current file and press its destination number.

```text
See file → Decide → Press 1–9 → Next file
```

That's the workflow.

---

## Controls

| Control | Action |
|---|---|
| `1` – `9` | Copy current file to the corresponding destination |
| `←` | Previous file |
| `→` | Next file |
| `Ctrl + Z` | Undo the previous classification |
| Mouse wheel | Zoom image in / out |
| Click + drag | Pan around a zoomed image |
| `Esc` | Reset image to `X1.0` and center it |
| Video controls | Play, pause, seek and control supported videos |

`Ctrl + Z` can be repeated to undo multiple classifications in reverse order.

---

## Image inspection

Image Sorter includes a lightweight preview designed for fast visual decisions.

**Zoom** with the mouse wheel, **drag** to inspect different areas of the image, and press **Esc** at any time to return to the original centered `X1.0` view.

The current zoom level is displayed beside the preview.

---

## Photo, RAW & video workflows

Image Sorter recognizes common photography and camera-media formats, including standard images, RAW files and video containers.

### Images

Examples include:

`JPG` · `JPEG` · `PNG` · `WEBP` · `TIFF` · `HEIC` · `HEIF`

### Camera RAW

Examples include:

`DNG` · `CR2` · `CR3` · `NEF` · `NRW` · `ARW` · `RAF` · `ORF` · `ORI` · `RW2` · `RWL` · `PEF` · `3FR` · `FFF` · `IIQ` · `SRW`

### Video

Examples include:

`MP4` · `MOV` · `M4V` · `MKV` · `WEBM` · `MTS` · `M2TS` · `MXF` · `AVI` · `MPG` · `MPEG` · `MOD` · `TOD` · `3GP` · `3G2` · `VOB`

Video files supported by Chromium/Electron can be played directly inside the preview.

Other recognized media files can still be navigated and classified even when native preview is unavailable.

---

## Originals stay untouched

Image Sorter is deliberately non-destructive.

When you classify a file:

```text
SOURCE
photo.jpg
    │
    │  press 1
    ▼
DESTINATION 1
photo.jpg
```

The destination receives a **copy**.

The original remains exactly where it was.

When you press `Ctrl + Z`, Image Sorter removes the created copy and restores the file to the active sorting queue.

No cloud upload is involved in the sorting workflow.

---

## Download

### Windows

[![Download latest release](https://img.shields.io/badge/Download-Image_Sorter_for_Windows-2ea44f?style=for-the-badge&logo=windows)](https://github.com/zautomation-real/image-sorter/releases/latest)

The current Windows build is **portable**:

1. Download the `.exe` from the latest release.
2. Open it.
3. Start sorting.

No Node.js, npm, Electron setup or installation process is required.

> macOS and Linux binaries are not currently provided.

---

## Run from source

Requires [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/zautomation-real/image-sorter.git
cd image-sorter
npm install
npm start
```

---

## Build it yourself

```bash
npm install
npm run build
```

The packaged Windows build is generated with **electron-builder**.

---

## Built with

<div align="center">

![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?style=flat-square&logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-UI-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=flat-square&logo=css3&logoColor=white)

</div>

No frameworks. No accounts. No external service required for the core sorting workflow.

---

## Feedback & contributions

Found a bug, have a camera format that isn't recognized, or have an idea that would make sorting faster?

[Open an issue](https://github.com/zautomation-real/image-sorter/issues) or submit a pull request.

---

<div align="center">

### One file. One decision. One keypress.

[**Download Image Sorter →**](https://github.com/zautomation-real/image-sorter/releases/latest)

</div>
