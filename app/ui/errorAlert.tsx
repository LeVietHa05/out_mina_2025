"use client";
import { useState } from "react";
import { XCircle, AlertTriangle } from "lucide-react";

export default function ErrorAlert({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-start bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md relative">
      <AlertTriangle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
      <span className="text-sm">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-red-500 hover:text-red-700"
      >
        <XCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
