"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-transparent">
      {/* Logo + Search */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center text-xl font-bold text-blue-600">
          <Image src={"/logo.png"} alt="logo" width={120} height={37}></Image>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm hội thoại"
            className="pl-10 pr-4 py-2 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 border-2"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70">
            <Image src="/icon/search.svg" alt="search" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-100 border border-2 border-gray-300 transition">
          <Image src="/icon/mic.svg" alt="mic" width={24} height={24} />
          Phiên âm hội thoại
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-2 border-gray-300  hover:bg-yellow-100 transition">
          <Image src="/icon/videocam.svg" alt="video" width={24} height={24} />
          Tham gia cuộc họp
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Giangnh1</span>
              <span className="text-xs text-green-600">Free plan</span>
            </div>
            <Image
              src={"/icon/dropdown.svg"}
              width={24}
              height={24}
              alt="dropdown"
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 border-2 rounded-lg shadow-xl z-50">
              <Link href="/">
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                  <Image
                    src="/icon/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                  Đăng xuất
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
