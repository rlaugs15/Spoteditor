import { redirect } from 'next/navigation';

interface Props {
  params: { logId: string };
}

export default function Page({ params }: Props) {
  redirect(`/log/${params.logId}`);
}
