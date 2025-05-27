'use client';

import MotionCard from '@/components/common/Card/MotionCard';
import { PostCard, PostCardWrapper } from '@/components/common/Card/PostCard';
import CustomPagination from '@/components/common/CustomPagination';
import { TitledSection } from '@/components/common/SectionBlock';
import useLogs from '@/hooks/queries/log/useLogs';
import useQueryPagination from '@/hooks/useQueryPagination';
import Link from 'next/link';
import { useRef } from 'react';

interface LatestLogConentProps {
  currentPage: number;
}

export default function LatestLogConent({ currentPage }: LatestLogConentProps) {
  const contentRef = useRef<HTMLElement | null>(null);
  const { handlePageChange } = useQueryPagination('logPage', currentPage, contentRef);
  const { data } = useLogs({ currentPage, pageSize: 13 });
  return (
    <section ref={contentRef}>
      <TitledSection title="Latest" subTitle="Log">
        <PostCardWrapper className="mb-[50px]">
          {data?.data.map((log) => (
            <Link href={`log/${log?.log_id}`} key={log?.log_id}>
              <MotionCard>
                <PostCard log={log} />
              </MotionCard>
            </Link>
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
