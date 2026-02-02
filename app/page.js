"use client"; // Bắt buộc dòng này để chạy React trên trình duyệt

import { useState } from "react";

export default function Home() {
  // Các biến trạng thái (State) để lưu dữ liệu
  const [url, setUrl] = useState("wss://sma-cmwfxfg7.livekit.cloud");
  const [token, setToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState([]);

  // Hàm ghi nhật ký ra màn hình
  const addLog = (message) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  };

  // Hàm giả lập kết nối (Bài tập 1 chưa cần kết nối thật)
  const handleConnect = () => {
    if (!token) {
      alert("⚠️ Bạn chưa nhập Token!");
      return;
    }
    
    addLog("⏳ Đang thử kết nối...");
    
    // Giả vờ đợi 1 giây rồi báo thành công (Để test giao diện)
    setTimeout(() => {
      setIsConnected(true);
      addLog("✅ Đã kết nối thành công (Mô phỏng)!");
      addLog("🎤 Micro đã sẵn sàng.");
    }, 1000);
  };

  // Hàm ngắt kết nối
  const handleDisconnect = () => {
    setIsConnected(false);
    addLog("🛑 Đã ngắt kết nối.");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      {/* Khung chứa chính (Container) */}
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-neutral-800 p-4 border-b border-neutral-700 text-center">
          <h1 className="text-xl font-bold text-cyan-400">🦖 SMA Controller</h1>
          <p className="text-xs text-neutral-400 mt-1">NextJS Web Client</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Trạng thái */}
          <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-sm text-neutral-400">Status:</span>
            {isConnected ? (
              <span className="text-green-500 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Connected
              </span>
            ) : (
              <span className="text-red-500 font-bold">Disconnected</span>
            )}
          </div>

          {/* Ô nhập liệu (Chỉ hiện khi chưa kết nối) */}
          {!isConnected && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-500 uppercase font-bold ml-1">LiveKit URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-500 uppercase font-bold ml-1">Token</label>
                <input
                  type="text"
                  placeholder="Dán token eyJ... vào đây"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Nút bấm */}
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all active:scale-95"
            >
              STOP / NGẮT KẾT NỐI
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(8,145,178,0.5)]"
            >
              START / KẾT NỐI
            </button>
          )}

          {/* Cửa sổ Log (Nhật ký) */}
          <div className="mt-4">
            <label className="text-xs text-neutral-500 uppercase font-bold ml-1 mb-2 block">Terminal Log</label>
            <div className="h-48 bg-black border border-neutral-800 rounded-lg p-3 overflow-y-auto font-mono text-xs space-y-1">
              {logs.length === 0 && <span className="text-neutral-600 italic">Chưa có nhật ký...</span>}
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 border-b border-neutral-900 pb-1 last:border-0">
                  <span className="text-neutral-500 mr-2">&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}