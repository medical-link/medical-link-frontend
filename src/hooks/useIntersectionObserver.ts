import { useEffect } from 'react';

function isHTMLElement(target: any): target is HTMLElement {
  return target instanceof HTMLElement;
}
interface UserIntersectionObserverProps extends IntersectionObserverInit {
  target: HTMLDivElement;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: UserIntersectionObserverProps) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    if (!target) {
      return;
    }
    if (isHTMLElement(target)) {
      observer?.observe(target);
    }

    // eslint-disable-next-line consistent-return
    return () => observer?.disconnect();
  }, [target, root, rootMargin, onIntersect, threshold]);
};

export default useIntersectionObserver;
