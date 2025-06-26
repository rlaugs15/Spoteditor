import { LogIdParams } from '@/app/[locale]/(root)/log/[logId]/page';
import { fetchLog } from '@/app/actions/log';
import { HOME } from '@/constants/pathname';
import { redirect } from 'next/navigation';
import LogEditPage from './_EditPage/page';
interface LogEditServerPageProps {
  params: Promise<LogIdParams>;
}

const LogEditServerPage = async ({ params }: LogEditServerPageProps) => {
  const { logId } = await params;
  const result = await fetchLog(logId);
  if (!result.success) redirect(HOME);
  const logData = result.data;

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
