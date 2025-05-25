import { fetchLog } from '@/app/actions/log';
import LogEditPage from './_EditPage/page';

const LogEditServerPage = async ({ params }: { params: { logId: string } }) => {
  const { logId } = params;
  const { data: logData } = await fetchLog(logId);

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
