import { LogIdParams } from '@/app/(root)/log/[logId]/page';
import { fetchLog } from '@/app/actions/log';
import LogEditPage from './_EditPage/page';
interface LogEditServerPageProps {
  params: LogIdParams;
}

const LogEditServerPage = async ({ params }: LogEditServerPageProps) => {
  const { logId } = await params;
  const { data: logData } = await fetchLog(logId);

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
