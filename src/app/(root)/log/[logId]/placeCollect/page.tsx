import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ logId: string }>;
}

export default async function Page({ params }: Props) {
  const { logId } = await params;
  redirect(`/log/${logId}`);
}
