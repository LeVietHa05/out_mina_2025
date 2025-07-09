"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import MeetingSummary from "../ui/meetingSumary";
import ErrorAlert from "../ui/errorAlert";

type MeetingContent = {
  ghi_chu_tong_quan: string;
  ke_hoach_tiep_theo: Record<string, string>;
  tien_do_cong_viec: Record<string, string>;
  raw: string; //optional
};

const filters = [
  { key: "recent", label: "Gần đây", icon: "recent.svg" },
  { key: "featured", label: "Nổi bật", icon: "star.svg" },
  { key: "mine", label: "Tạo bởi tôi", icon: "personal_edit.svg" },
  { key: "shared", label: "Chia sẻ với tôi", icon: "share.svg" },
];

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const NEXT_PUBLIC_API_URL_2 = process.env.NEXT_PUBLIC_API_URL_2 || "";
if (!NEXT_PUBLIC_API_URL || !NEXT_PUBLIC_API_URL_2) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in the environment variables"
  );
}

export default function HomePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("mine");
  const [meetingData, setMeetingData] = useState<MeetingContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0); // giá trị từ 0 đến 100
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilterClick = (key: string) => {
    setSelectedFilter(key);
    //TODO: IMPLEMENT FILTER LOGIC HERE
    console.log("Filter selected:", key);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles(files);
    await uploadFiles(files);
  }, []);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setDroppedFiles(files);
    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    if (isLoading) {
      alert("Đang xử lý, vui lòng đợi...");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      console.log(file);
      formData.append("file", file);
    });

    try {
      setIsLoading(true);
      setProgress(0);
      setErrorMessage(null); // reset trước khi gọi

      // TODO: update the URL later
      //   const res = await fetch("/api/mock", {
      const res = await fetch(NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });
      setProgress(20);
      if (!res.ok) {
        console.log(res);
        throw new Error("Không thể upload tệp.");
      }

      const result = await res.json();

      const jobID = result.job_id;
      console.log("jobID:", jobID);
      setProgress(50);

      const newRes = await fetch(`${NEXT_PUBLIC_API_URL_2}?job_id=${jobID}`);
      if (!newRes.ok) {
        throw new Error("Lỗi khi lấy kết quả từ hệ thống.");
      }
      const newResult = await newRes.json();
      setProgress(100);

      setMeetingData(newResult.content);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Đã có lỗi xảy ra khi xử lý yêu cầu."
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0); // Reset sau một khoảng thời gian nhỏ
      }, 300);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Image src="/icon/thumb_up.svg" alt="like" width={28} height={28} />
        Chào buổi sáng, David
      </h1>

      {/* Bộ lọc */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Danh sách hội thoại của tôi</h2>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
                className={`px-4 py-1.5 rounded-full flex justify-center items-center gap-1 text-sm border transition-all
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200"
                  }`}
              >
                <Image
                  src={`/icon/${filter.icon}`}
                  alt={filter.label}
                  width={16}
                  height={16}
                />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      {/* Bảng danh sách */}
      <div className="mt-6">
        <div className="grid grid-cols-[40%_15%_15%_15%_15%] text-gray-800 font-medium text-sm mb-4 px-2">
          <div>Tất cả</div>
          <div>Thời lượng</div>
          <div>Ngày tạo</div>
          <div>Người tạo</div>
          <div>Thao tác</div>
        </div>

        {/* Drag-drop zone */}
        <div
          onClick={handleClickUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center text-center py-10 border rounded-lg border-dashed cursor-pointer ${
            isDragging
              ? "bg-blue-50 border-blue-400"
              : "bg-gray-50 border-gray-300"
          } transition-all duration-200`}
        >
          <Image
            src="/upload.png"
            alt="upload"
            width={160}
            height={120}
            className="mb-4"
          />
          <p className="text-gray-700">
            Kéo và thả tệp vào đây để{" "}
            <span className="text-blue-600 underline">phiên âm ngay</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </div>
        {/* loading */}
        {isLoading && (
          <div className="mt-6">
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-600 mt-1 text-center">
              Đang xử lý: {progress}%
            </p>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4">
            <ErrorAlert message={errorMessage} />
          </div>
        )}
        {/* Hiển thị dữ liệu hội nghị */}
        {meetingData && <MeetingSummary content={meetingData} />}

        {/* Hiển thị file */}
        {droppedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Tệp đã chọn:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-800">
              {droppedFiles.map((file, idx) => (
                <li key={idx}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
