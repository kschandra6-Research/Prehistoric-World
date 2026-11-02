#!/usr/bin/env bash
# LITHOS - Prehistoric Stone Atlas
# Unix/macOS/Linux Launcher Script
# Concept & Design by K.S.Chandra 2026

echo "==============================================================================="
echo "    L I T H O S  :  P R E H I S T O R I C   S T O N E   A T L A S"
echo "       Atlas of Stone Tools, Implements, Artefacts & Art of Prehistory"
echo "                Concept & Design by K.S.Chandra 2026"
echo "==============================================================================="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

if command -v python3 &>/dev/null; then
    echo "[+] Launching with Python 3..."
    python3 launcher.py
elif command -v python &>/dev/null; then
    echo "[+] Launching with Python..."
    python launcher.py
elif command -v open &>/dev/null; then
    echo "[+] Opening directly on macOS..."
    open index.html
elif command -v xdg-open &>/dev/null; then
    echo "[+] Opening directly on Linux..."
    xdg-open index.html
else
    echo "[!] Please open index.html in your preferred web browser."
fi
