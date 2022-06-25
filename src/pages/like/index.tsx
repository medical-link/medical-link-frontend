import { useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
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
import { titleAtom } from '~/store';
import styles from './Like.module.scss';

const LikePage = () => {
  const [target, setTarget] = useState({} as any);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [researches, setResearches] = useState<ResearchesResponseData>([]);
  const [fireLikeEvent, setFireLikeEvent] = useState(false);
  const handleToggleFireEvent = () => setFireLikeEvent((prev) => !prev);

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
    setTitle('좋아요');
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
              category: 'likes',
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
          category: 'likes',
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
  }, [fireLikeEvent]);

  if (researches?.length === 0 && loadingVisible) return <SpinnerView />;
  if (researches?.length === 0) {
    return <NoData text="좋아요 된 임상시험 정보가 없어요!" />;
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.like}>
        <div className={styles['card-area']}>
          {researches.map((each) => (
            <ResearchCard
              key={each.id}
              {...each}
              handleToggleFireEvent={handleToggleFireEvent}
            />
          ))}
          {loadingVisible && (
            <Spinner ref={setTarget} isActive={researches.length >= 10} />
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default LikePage;
