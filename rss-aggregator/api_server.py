#!/usr/bin/env python3
"""
启动本地 HTTP 服务器，提供 RSS 聚合数据 API
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
from pathlib import Path

class APIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/top-news':
            # 先运行聚合脚本获取最新数据
            subprocess.run(['python', 'aggregator.py'], cwd='.')
            
            # 读取生成的 JSON
            data_path = Path('./data/top-news.json')
            if data_path.exists():
                with open(data_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(data).encode())
            else:
                self.send_error(404, 'Data not found')
        else:
            self.send_error(404, 'Not found')
    
    def log_message(self, format, *args):
        # 简化日志输出
        print(f"[API] {args[0]}")

def main():
    port = 8080
    server = HTTPServer(('localhost', port), APIHandler)
    print(f"🚀 API 服务器启动: http://localhost:{port}/api/top-news")
    print("按 Ctrl+C 停止")
    server.serve_forever()

if __name__ == '__main__':
    main()
