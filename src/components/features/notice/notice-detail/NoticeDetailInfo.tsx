interface NoticeDetailInfoProps {
  title: string;
  content: string;
}

export default function NoticeDetailInfo({ title, content }: NoticeDetailInfoProps) {
  return (
    <div className="flex flex-col gap-[7px]">
      <h3 className="font-bold text-text-lg">{title}</h3>
      <span className="text-text-sm text-primary-600">{content}</span>
    </div>
  );
}
