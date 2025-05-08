import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInView(
  ref: RefObject<Element>,
  options: UseInViewOptions = { threshold: 0, rootMargin: '0px' }
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options.threshold, options.rootMargin]);

  return isIntersecting;
}