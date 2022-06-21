/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import cn from 'classnames';
import styles from './Banner.module.scss';

const TOTAL_SLIDES = 2;

const Banner = () => {
  const [index, setIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleIndex = (i: number) => setTimeout(() => setIndex(i), 0);

  const nextSlide = useCallback(() => {
    if (index >= TOTAL_SLIDES) {
      handleIndex(0);
    } else {
      handleIndex(index + 1);
    }
  }, [index]);

  const prevSlide = useCallback(() => {
    if (index === 0) {
      handleIndex(TOTAL_SLIDES);
    } else {
      handleIndex(index - 1);
    }
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(id);
  }, [nextSlide]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${index}00%)`;
      slideRef.current.style.transition = 'transform 0.5s';
    }
  }, [index]);

  return (
    <div className={styles.banner}>
      <div className={styles['slider-container']} ref={slideRef}>
        {Array.from(Array(3).keys()).map((item) => (
          <img
            key={item}
            src={`/banner-${item + 1}.png`}
            alt={`banner-${item + 1}.png`}
          />
        ))}
      </div>
      <div className={styles['dot-container']}>
        {Array.from(Array(3).keys()).map((item) => (
          <div
            key={item}
            className={cn(styles.dot, { [styles.active]: index === item })}
          />
        ))}
      </div>
      <button
        type="button"
        className={styles.prev}
        onMouseDown={prevSlide}
      />
      <button
        type="button"
        className={styles.next}
        onMouseDown={nextSlide}
      />
    </div>
  );
};

export default Banner;
