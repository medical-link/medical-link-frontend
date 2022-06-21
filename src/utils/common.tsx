/* eslint-disable no-bitwise */
export const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = (Math.random() * 16) | 0;
  const v = c === 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
});

// eslint-disable-next-line no-promise-executor-return
export const handleDelay = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
