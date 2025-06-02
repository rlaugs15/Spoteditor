'use client';

import MotionCard from '@/components/common/Card/MotionCard';
import { PostCard, PostCardWrapper } from '@/components/common/Card/PostCard';
import CustomPagination from '@/components/common/CustomPagination';
import { TitledSection } from '@/components/common/SectionBlock';
import useLogs from '@/hooks/queries/log/useLogs';
import useQueryPagination from '@/hooks/useQueryPagination';
import { useRef } from 'react';

interface LatestLogConentProps {
  currentPage: number;
}

export default function LatestLogConent({ currentPage }: LatestLogConentProps) {
  const contentRef = useRef<HTMLElement | null>(null);
  const { handlePageChange } = useQueryPagination('logPage', currentPage, contentRef);
  const { data } = useLogs({ currentPage, pageSize: 13 });
  if (data && !data.success) {
    throw new Error(data.msg);
  }
  return (
    <section ref={contentRef}>
      <TitledSection title="Latest" subTitle="Log" showRefreshNotice>
        <PostCardWrapper className="mb-[50px]">
          {data?.data.map((log) => (
            <MotionCard key={log?.log_id}>
              <PostCard log={log} />
            </MotionCard>
          ))}
        </PostCardWrapper>
        <CustomPagination
          currentPage={currentPage}
          totalPages={Number(data?.meta?.pagination?.totalPages)}
          onChangePage={handlePageChange}
        />
      </TitledSection>
    </section>
  );
}
