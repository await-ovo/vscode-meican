export * from './constants';
export * from './invokeService';

export const removeTrailingSlash = (s: string) => s.replace(/\/$/, '');
