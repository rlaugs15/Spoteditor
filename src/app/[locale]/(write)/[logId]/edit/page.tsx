import { LogIdParams } from '@/app/[locale]/(root)/log/[logId]/page';
import { getLog } from '@/app/actions/log';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';
import LogEditPage from './_EditPage/page';
interface LogEditServerPageProps {
  params: Promise<LogIdParams>;
}

const LogEditServerPage = async ({ params }: LogEditServerPageProps) => {
  const { logId } = await params;
  const locale = await getLocale();
  const result = await getLog(logId);

  if (!result.success) {
    redirect({
      href: '/',
      locale,
    });
    return;
  }
  const logData = result.data;

  return <LogEditPage logData={logData} />;
};

export default LogEditServerPage;
