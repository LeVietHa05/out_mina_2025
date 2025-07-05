"use client";

import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 h-full bg-transparent p-4 flex flex-col">
      {/* Nút Trang chủ */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-300 bg-sky-100 transition"
      >
        <Image src="/icon/home.svg" alt="Trang chủ" width={24} height={24} />
        <span className="text-base font-medium text-blue-800">Trang chủ</span>
      </Link>
    </aside>
  );
}
