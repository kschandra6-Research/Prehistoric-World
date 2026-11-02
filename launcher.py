#!/usr/bin/env python3
"""
LITHOS - Prehistoric Stone Atlas
Cross-Platform Direct Launcher (Windows, macOS, Linux)
Concept & Design by K.S.Chandra 2026
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        # Keep terminal output clean
        sys.stderr.write(f"[{time.strftime('%H:%M:%S')}] {args[0]} - {args[1]}\n")

def open_browser():
    time.sleep(0.8)
    url = f"http://localhost:{PORT}"
    print(f"\n[+] Opening browser at: {url}")
    webbrowser.open(url)

def main():
    print("=" * 78)
    print("   L I T H O S  :  P R E H I S T O R I C   S T O N E   A T L A S")
    print("      Atlas of Stone Tools, Implements, Artefacts & Art of Prehistory")
    print("               Concept & Design by K.S.Chandra 2026")
    print("=" * 78)
    print(f"[+] Root directory: {DIRECTORY}")
    
    # Check port availability or fallback
    global PORT
    for attempt_port in [8080, 8000, 8888, 9000, 0]:
        try:
            handler = QuietHandler
            server = socketserver.TCPServer(("", attempt_port), handler)
            PORT = server.server_address[1]
            break
        except OSError:
            continue

    print(f"[+] Server successfully active on: http://localhost:{PORT}")
    print("[+] Press Ctrl+C at any time to shut down the server.\n")

    threading.Thread(target=open_browser, daemon=True).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[+] Shutting down LITHOS Atlas server. Thank you!")
        server.server_close()
        sys.exit(0)

if __name__ == "__main__":
    main()
