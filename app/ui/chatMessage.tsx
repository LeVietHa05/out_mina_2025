import Image from "next/image";
import { ReactNode } from "react";

export default function ChatMessage({
  text,
  sender,
}: {
  text: ReactNode;
  sender: string;
}) {
  let iconLink = "";
  let css = "";
  if (sender == "AI") {
    iconLink = "/icon/user_icon.svg";
    css="bg-blue-100"
  } else {
    iconLink = "/icon/user_icon.svg";
    css = "text-right flex-row-reverse";
  }
  return (
    <div className={`flex ${sender !== "AI" ? "flex-row-reverse" : ""}`}>
      <div
        className={`p-3  my-4  flex gap-4 border border-gray-200 rounded-3xl shadow-md ${css}`}
      >
        <div>
          <Image className="border border-gray-400 rounded-full" src={iconLink} width={24} height={24} alt="AI icon"></Image>
        </div>
        <div className="">{text}</div>
      </div>
    </div>
  );
}
