export * from './constants';
export * from './invokeService';
export * from './vscode';

export const removeTrailingSlash = (s: string) => s.replace(/\/$/, '');

export const parseDishName = (dishName: string) => {
  const matched = dishName.match(/(.+)\((.+)\)/) || [];

  return {
    name: matched[1],
    desc: matched[2],
  };
};
