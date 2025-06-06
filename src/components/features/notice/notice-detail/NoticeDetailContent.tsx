interface NoticeDetailContentProps {
  content: string;
}

export default function NoticeDetailContent({ content }: NoticeDetailContentProps) {
  return (
    <section className="flex px-4 py-10">
      <span className="font-medium text-text-sm text-primary-600 whitespace-pre-line">
        {content}
      </span>
    </section>
  );
}
