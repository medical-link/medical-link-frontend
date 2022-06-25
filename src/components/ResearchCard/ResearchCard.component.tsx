/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ResearchData, researchesApiService } from '~/service';
import Hospital from 'public/hospital.svg';
import ArrowRight from 'public/arrow-right.svg';
import Heart from 'public/heart.svg';
import HeartFill from 'public/heart-fill.svg';
import { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import styles from './ResearchCard.module.scss';
import { Tag, toast } from '../common';

interface ResearchCardProps extends ResearchData {
  handleToggleFireEvent?: () => void;
}

const ResearchCard = ({
  id,
  illness,
  title,
  level,
  country,
  status,
  productName,
  exclusionCriteria,
  periodStart,
  periodEnd,
  //   facilityDto,
  handleToggleFireEvent,
  like = false,
}: ResearchCardProps) => {
  const router = useRouter();
  const iconElement = useRef<HTMLDivElement>(null);

  const [isLike, setIsLike] = useState(like);

  const handleIconEffect = () => {
    if (iconElement.current) {
      iconElement.current.style.transition = 'all 200ms ease-out';
      iconElement.current.style.transform = 'scale(130%)';
      setTimeout(() => {
        if (iconElement.current) {
          iconElement.current.style.transition = 'all 200ms ease-in';
          iconElement.current.style.transform = 'scale(100%)';
        }
      }, 400);
    }
  };

  const handleToggleLike = async () => {
    try {
      if (isLike) {
        await researchesApiService.deleteResearchesLike({ researchId: id });
        setIsLike(false);
      } else {
        await researchesApiService.postResearchesLike({ researchId: id });
        setIsLike(true);
      }

      handleIconEffect();
      // eslint-disable-next-line no-unused-expressions
      handleToggleFireEvent && handleToggleFireEvent();
    } catch {
      toast.error('서버 에러가 발생했습니다!');
    }
  };

  const HeartIcon = isLike ? HeartFill : Heart;

  return (
    <div
      className={styles['research-card']}
      onClick={() => router.push(`/report/detail/${id}`)}
    >
      <div className={styles.title}>
        <div className={styles['title-left']}>
          <Hospital />
          <span>{title}</span>
        </div>
        <span>
          <ArrowRight />
        </span>
      </div>
      <div className={styles.info}>
        [사용제품]
        {' '}
        {productName}
      </div>
      <div className={styles.info}>
        [질환명]
        {' '}
        {illness}
      </div>
      <div className={styles.info}>
        [기준]
        {' '}
        {exclusionCriteria}
      </div>
      <div className={styles.period}>
        {periodStart}
        {' ~ '}
        {periodEnd}
      </div>
      <div className={styles.bottom}>
        <div className={styles.tag}>
          <Tag text={level} />
          <Tag text={country} />
          <Tag text={status} isActive={status === '모집중'} />
        </div>
        <div ref={iconElement}>
          <HeartIcon
            onClick={(e: any) => {
              e.stopPropagation();
              handleToggleLike();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
