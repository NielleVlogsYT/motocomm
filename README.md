# MotoComm 🏍️

An offline-first, standalone Android kiosk application built with Jetpack Compose, designed to act as a localized motorcycle intercom and shared media playback hub over peer-to-peer network interfaces.

## 📐 Architecture Overview
MotoComm leverages an integrated web-to-native architecture model to execute low-latency communications completely off-grid:
* **Frontend Interface:** Responsive mobile-first dashboard optimized with dynamic viewport clamping for varying smartphone displays.
* **Audio Pipeline:** Web Audio API handles independent runtime tracking and audio mixing for local file loaders and active microphone capture arrays.
* **Networking Layer:** A local Node.js engine uses Socket.io to coordinate ICE signaling, routing data directly to a fullscreen WebRTC-enabled Android WebView container.

---

## 📂 Repository Structure

├── app/                        # Android Studio Project Root
│   ├── src/main/
│   │   ├── AndroidManifest.xml # Manages hardware feature locks (GPS, Mic)
│   │   └── java/.../MainActivity.kt # Jetpack Compose WebView wrapper & gateway prioritizer
├── server/                     # Termux Backend Engine
│   ├── index.html              # Responsive UI & WebRTC/Geolocation controller
│   └── server.js               # Offline local signallers
└── README.md

---

## 🛠️ System Pre-requisites & Requirements

### Host Environment (Termux/PC)
* Node.js v18+
* OpenSSL (For generating self-signed HTTPS certificates)

### Mobile Client Environment
* Android 11.0 (API Level 30) or higher
* Physical hardware access to GPS and Audio Recording peripherals

---

## 🚀 Technical Setup & Deployment

### 1. Automated One-Line Termux Setup (Host/Driver)
If you are setting up a host device from scratch, ensure your device is connected to the internet, open **Termux**, and paste this single command. It will automatically update dependencies, install Git, Node.js, the proper OpenSSL binaries, clone the repo, generate your local security certificates, and boot the server:

```bash
pkg update -y && pkg install git nodejs openssl-tool -y && git clone [https://github.com/NielleVlogsYT/motocomm.git](https://github.com/NielleVlogsYT/motocomm.git) && cd motocomm && npm install && openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.crt -days 365 -nodes -subj "/CN=localhost" && node server.js

If you already have the repository cloned and need to update your Termux folder with your latest code updates pushed to GitHub, run these commands:

input these line by line erase " "
"cd motocomm"
"git pull"
"npm install"

To start your local backend server manually after updates or on subsequent offline trips:
node server.js
