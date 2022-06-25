import { useAtomValue, useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Filter,
  NoData,
  ResearchCard,
  Spinner,
  SpinnerView,
} from '~/components';
import { useIntersectionObserver } from '~/hooks';
import {
  researchesApiService,
  ResearchesRequestData,
  ResearchesResponseData,
} from '~/service';
import { titleAtom, userDataAtom } from '~/store';
import ArrowDown from 'public/arrow-down.svg';
import { useRouter } from 'next/router';
import styles from './Report.module.scss';

const ReportPage = () => {
  const router = useRouter();
  const { name, age, sex } = useAtomValue(userDataAtom);
  const [target, setTarget] = useState({} as any);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [researches, setResearches] = useState<ResearchesResponseData>([]);

  const setTitle = useSetAtom(titleAtom);
  const methods = useForm<ResearchesRequestData>({
    defaultValues: {
      page: 0,
      size: 10,
      category: '',
      value: '',
    },
  });
  const { setValue, getValues, watch } = methods;
  const { category, value } = getValues();
  watch();

  useEffect(() => {
    setTitle('의료정보');
    return () => setTitle('');
  }, []);

  useIntersectionObserver({
    target,
    // eslint-disable-next-line no-shadow
    onIntersect: ([{ isIntersecting, target }], observer) => {
      if (isIntersecting) {
        debounce(async () => {
          try {
            const page = getValues('page');
            const data = await researchesApiService.getResearches({
              page: page + 1,
              category,
              value,
              size: 10,
            });
            if (data.length !== 0) {
              setValue('page', page + 1);
              setResearches((prev) => [...prev, ...data]);
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
    setResearches([]);
    setLoadingVisible(true);
    (async () => {
      try {
        const page = getValues('page');
        const data = await researchesApiService.getResearches({
          page,
          category,
          value,
          size: 10,
        });
        if (data.length !== 0) {
          setResearches((prev) => [...prev, ...data]);
        } else {
          setLoadingVisible(false);
        }
      } catch {
        setLoadingVisible(false);
      }
    })();
  }, [category, value]);

  if (researches?.length === 0 && loadingVisible) return <SpinnerView />;

  return (
    <FormProvider {...methods}>
      {researches?.length === 0 && (
        <div className={styles['no-data']}>
          <NoData
            text="일치하는 정보가 없어요!"
            text2="다른 조건을 적용해 주세요"
          />
        </div>
      )}
      <div className={styles.report}>
        {name && (
          <button
            type="button"
            className={styles.profile}
            onClick={() => router.push('/my-info/health-check')}
          >
            <div>
              <span>{name}</span>
              <strong>{`${age}, ${sex}`}</strong>
            </div>
            <ArrowDown />
          </button>
        )}
        <Filter />
        <div className={styles['card-area']}>
          {researches.map((each) => (
            <ResearchCard key={each.id} {...each} />
          ))}
          {loadingVisible && (
            <Spinner ref={setTarget} isActive={researches.length >= 10} />
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default ReportPage;
