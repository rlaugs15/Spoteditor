import { LogIdParams } from '@/app/[locale]/(root)/log/[logId]/page';
import { fetchLog } from '@/app/actions/log';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import LogEditPage from './_EditPage/page';
interface LogEditServerPageProps {
  params: Promise<LogIdParams>;
}

const LogEditServerPage = async ({ params }: LogEditServerPageProps) => {
  const { logId } = await params;
  const locale = await getLocale();
  const result = await fetchLog(logId);
  if (!result.success) redirect(`/${locale}`);
  const logData = result.data;

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
