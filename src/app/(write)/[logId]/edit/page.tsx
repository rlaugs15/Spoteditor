import { LogIdParams } from '@/app/(root)/log/[logId]/page';
import { fetchLog } from '@/app/actions/log';
import LogEditPage from './_EditPage/page';
interface LogEditServerPageProps {
  params: LogIdParams;
}

const LogEditServerPage = async ({ params }: LogEditServerPageProps) => {
  const { logId } = await params;
  const result = await fetchLog(logId);
  if (!result.success) {
    throw new Error(result.msg);
  }
  const logData = result.data;

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
