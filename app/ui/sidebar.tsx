"use client";

import Image from "next/image";
import Link from "next/link";
import ChatMessage from "./chatMessage";
import { useState, useRef, useEffect } from "react";

const NEXT_PUBLIC_CHAT_API = process.env.NEXT_PUBLIC_CHAT_API || "";
if (!NEXT_PUBLIC_CHAT_API)
  throw new Error("NEXT_PUBLIC_CHAT_API is not defined");

export default function Sidebar() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessageValue, setInputMessageValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<
    { text: string; sender: "user" | "AI" }[]
  >([{ text: "Chào bạn! Mình là AI hỗ trợ của bạn nè. Để được support liên quan đến đoạn tóm tắt, bạn hãy nhập theo cú pháp: 'job_id: thay-id-thật-vào-đây' cộng với câu hỏi của bạn nhé. Nếu bạn nhập sai thì tôi không giúp bạn được đâu.", sender: "AI" }]);

  //scroll to top when messaging
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages, isLoading]);

  //send message when press enter
  const handelSendMessage = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Enter" && inputMessageValue.trim()) {
      const message = inputMessageValue.trim();
      setIsLoading(true);
      //cap nhat tin nhan nguoi dung
      setChatMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setInputMessageValue("");

      try {
        // 2. Gọi API trả lời
        const res = await fetch(NEXT_PUBLIC_CHAT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: message }),
        });

        if (!res.ok) throw new Error("AI không phản hồi");

        const data = await res.json();

        // 3. Hiển thị phản hồi từ AI
        setChatMessages((prev) => [
          ...prev,
          { text: data.content, sender: "AI" },
        ]);
      } catch (err) {
        console.log(err);
        setChatMessages((prev) => [
          ...prev,
          {
            text: "Lỗi khi kết nối đến AI. Vui lòng thử lại sau.",
            sender: "AI",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="w-1/3 h-full bg-transparent p-4 flex flex-col items-center">
      {/* Nút Trang chủ */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-300 bg-sky-100 transition"
      >
        {/* <Image src="/icon/home.svg" alt="Trang chủ" width={24} height={24} /> */}
        <span className="text-center text-base font-medium text-blue-800">
          Chat with AI
        </span>
      </Link>
      <div className="relative flex items-end flex-1 w-full border border-gray-200 rounded-2xl p-4  mt-4 shadow-lg bg-white">
        {/* các câu thoại ở đây */}
        <div
          ref={chatContainerRef}
          className="absolute top-0 left-0 w-full h-full overflow-y-auto p-4 pb-20"
        >
          {/* 1 vai cau chat mac dinh cua AI */}
          {chatMessages.map((msg, idx) => (
            <ChatMessage key={idx} text={msg.text} sender={msg.sender} />
          ))}
          {isLoading && (
            <ChatMessage
              text={
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Image
                    src="/icon/loading.svg"
                    alt="Đang trả lời"
                    width={24}
                    height={24}
                    className="animate-spin"
                  />
                  Đang trả lời...
                </div>
              }
              sender="AI"
            />
          )}
        </div>

        {/* input chat field */}
        <input
          type="text"
          value={inputMessageValue}
          onChange={(e) => {
            setInputMessageValue(e.target.value);
          }}
          onKeyDown={handelSendMessage}
          placeholder="Bạn gì ơi. Bạn muốn hỏi gì nhỏ?"
          className="z-10 backdrop-blur-sm bg-white/30 bottom-4 w-full h-16 rounded-2xl p-4 border border-gray-300 border border-gray-300 outline-blue-300 hover:bg-blue-100  transitiion-all duration-200 inset-shadow-sm"
        />
      </div>
    </div>
  );
}
