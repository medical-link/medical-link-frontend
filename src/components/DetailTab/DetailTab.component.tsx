import { NextRouter, useRouter } from 'next/router';
import cn from 'classnames';
import Like from 'public/like.svg';
import Report from 'public/report.svg';
import MyInfo from 'public/my-info.svg';
import Heart from 'public/heart.svg';
import HeartFill from 'public/heart-fill.svg';
import { useRef, useState } from 'react';
import { researchesApiService } from '~/service';
import Link from 'next/link';
import styles from './DetailTab.module.scss';
import { Button, toast } from '../common';

interface DetailTabProps {
  id: number;
  like: boolean;
  detailURL: string;
}

const DetailTab = ({ id, like, detailURL }: DetailTabProps) => {
  const { pathname, push } = useRouter();
  const [isLike, setIsLike] = useState(like);
  const iconElement = useRef<HTMLSpanElement>(null);

  if (pathname && !pathname.includes('detail')) {
    return null;
  }

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
    } catch {
      toast.error('서버 에러가 발생했습니다!');
    }
  };

  const HeartIcon = isLike ? HeartFill : Heart;

  return (
    <div className={cn(styles['detail-tab'])}>
      <div className={styles['tab-container']}>
        <div className={styles.icon}>
          <span ref={iconElement}>
            <HeartIcon
              onClick={(e: any) => {
                e.stopPropagation();
                handleToggleLike();
              }}
            />
          </span>
        </div>
        <a target="_blank" href={detailURL} rel="noopener noreferrer">
          <Button labelText="임상시험 정보 보러가기" fullWidth />
        </a>
      </div>
    </div>
  );
};

export default DetailTab;
