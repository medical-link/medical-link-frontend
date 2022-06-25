import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DetailTab, Tag } from '~/components';
import { researchesApiService, ResearchesDetailResponseData } from '~/service';
import { titleAtom } from '~/store';
import styles from './ReportDetail.module.scss';

const ReportDetailPage = () => {
  const { query } = useRouter();
  const [research, setResearch] = useState<ResearchesDetailResponseData>();

  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle(research?.facilityName ?? '');
    return () => setTitle('');
  }, [research]);

  useEffect(() => {
    if (query.id) {
      (async () => {
        try {
          const data = await researchesApiService.getResearchesDetail({
            id: (query.id as string) ?? '',
          });
          setResearch(data);
        } catch {
          console.error('error');
        }
      })();
    }
  }, [query]);

  if (!research) {
    return null;
  }

  return (
    <>
      <div className={styles['report-detail']}>
        <Tag
          text={research?.status ?? ''}
          isActive={research?.status === '모집중'}
        />
        <div className={styles.content}>
          {research?.info?.map((each) => {
            const key = Object.keys(each)[0];
            const value = Object.values(each)[0];
            return (
              <div key={key}>
                <div className={styles.key}>{key}</div>
                <div className={styles.value}>{value === '' ? '-' : value}</div>
              </div>
            );
          })}
        </div>
      </div>
      <DetailTab
        id={research?.id}
        like={research?.like}
        detailURL={research?.detailURL}
      />
    </>
  );
};

export default ReportDetailPage;
