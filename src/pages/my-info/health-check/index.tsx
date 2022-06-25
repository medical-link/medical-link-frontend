import { useAtomValue, useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import {
  Accordion, NoData, Spinner, SpinnerView, Tag,
} from '~/components';
import { useIntersectionObserver } from '~/hooks';
import { medicalApiService, MedicalTestResponseData } from '~/service';
import { titleAtom, userDataAtom } from '~/store';
import styles from './HealthCheck.module.scss';

const HealthCheckPage = () => {
  const {
    name, age, sex, illnessList,
  } = useAtomValue(userDataAtom);
  const [target, setTarget] = useState({} as any);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [medicalTest, setMedicalTest] = useState<MedicalTestResponseData>([]);

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
            const data = await medicalApiService.getMedicalTestList({
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
        const data = await medicalApiService.getMedicalTestList({
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
    return <NoData text="건강검진 정보가 없어요!" />;
  }

  return (
    <div className={styles['health-check']}>

      {name && (
        <button type="button" className={styles.profile}>
          <div>
            <span>{name}</span>
            <strong>{`${age}, ${sex}`}</strong>
          </div>
          <div className={styles.tag}>
            {illnessList?.map((each) => (
              <Tag key={each} text={each} />
            ))}
          </div>
        </button>
      )}
      <div className={styles['card-area']}>
        {medicalTest?.map((each) => (
          <Accordion key={each.id} {...each} />
        ))}
        {loadingVisible && <Spinner ref={setTarget} isActive={medicalTest.length >= 10} />}
      </div>
    </div>
  );
};

export default HealthCheckPage;
