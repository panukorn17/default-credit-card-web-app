// src/setupTests.js
import '@testing-library/jest-dom';

// Mock IntersectionObserver
class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options || {};
  }

  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;

  observe(target: Element) {
    this.callback([{ isIntersecting: true, target }] as IntersectionObserverEntry[], this);
  }

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});
