import { useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import {
  NoData,
  RecordAccordion,
  Spinner,
  SpinnerView,
} from '~/components';
import { useIntersectionObserver } from '~/hooks';
import { medicalApiService, MedicalRecordResponseData } from '~/service';
import { titleAtom } from '~/store';
import styles from './Record.module.scss';

const HealthCheckPage = () => {
  const [target, setTarget] = useState({} as any);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [medicalTest, setMedicalTest] = useState<MedicalRecordResponseData>([]);

  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle('내 정보');
    return () => setTitle('');
  }, []);

  useIntersectionObserver({
    target,
    // eslint-disable-next-line no-shadow
    onIntersect: ([{ isIntersecting, target }], observer) => {
      if (isIntersecting) {
        debounce(async () => {
          try {
            const data = await medicalApiService.getMedicalRecordList({
              page: page + 1,
              size: 10,
            });
            if (data.length !== 0) {
              setPage((prev) => prev + 1);
              setMedicalTest((prev) => [...prev, ...data]);
            } else {
              setLoadingVisible(false);
              observer?.unobserve(target);
            }
          } catch {
            setLoadingVisible(false);
            observer?.unobserve(target);
          }
        }, 500)();
      }
    },
  });

  useEffect(() => {
    setMedicalTest([]);
    setLoadingVisible(true);
    (async () => {
      try {
        const data = await medicalApiService.getMedicalRecordList({
          page: 0,
          size: 10,
        });
        if (data.length !== 0) {
          setMedicalTest((prev) => [...prev, ...data]);
        } else {
          setLoadingVisible(false);
        }
      } catch {
        setLoadingVisible(false);
      }
    })();
  }, []);

  if (medicalTest?.length === 0 && loadingVisible) return <SpinnerView />;
  if (medicalTest?.length === 0) {
    return <NoData text="진료기록 정보가 없어요!" />;
  }

  return (
    <div className={styles.record}>
      <div className={styles['card-area']}>
        {medicalTest?.map((each) => (
          <RecordAccordion key={each.id} {...each} />
        ))}
        {loadingVisible && (
          <Spinner ref={setTarget} isActive={medicalTest.length >= 10} />
        )}
      </div>
    </div>
  );
};

export default HealthCheckPage;
