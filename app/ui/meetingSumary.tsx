// components/MeetingSummary.tsx

type MeetingContent = {
  ghi_chu_tong_quan: string;
  ke_hoach_tiep_theo: Record<string, string>;
  tien_do_cong_viec: Record<string, string>;
  raw: string; //optional
};

export default function MeetingSummary({
  content,
}: {
  content: MeetingContent;
}) {
  if (
    !content ||
    !content.ghi_chu_tong_quan ||
    !content.ke_hoach_tiep_theo ||
    !content.tien_do_cong_viec
  ) {
    return <p className="text-gray-500 text-sm">Thiếu dữ liệu để hiển thị.</p>;
  }

  const renderList = (items: Record<string, string>) => (
    <ol className="list-decimal list-inside space-y-1">
      {Object.entries(items).map(([key, value]) => (
        <li key={key} className="text-gray-800 text-sm">
          {value}
        </li>
      ))}
    </ol>
  );

  return (
    <div className="space-y-8 mt-10">
      <section>
        <h2 className="text-lg font-semibold mb-2">📝 Ghi chú tổng quan</h2>
        <p className="text-gray-700 text-sm">{content.ghi_chu_tong_quan}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">🚀 Tiến độ công việc</h2>
        {renderList(content.tien_do_cong_viec)}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">📅 Kế hoạch tiếp theo</h2>
        {renderList(content.ke_hoach_tiep_theo)}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">RAW</h2>
        <div>{content.raw}</div>
      </section>
    </div>
  );
}
