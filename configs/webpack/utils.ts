import path, { resolve, join } from 'path';

function getRelativePath(rootPath: string) {
  return function fn(args: any) {
    args = Array.prototype.slice.call(arguments, 0);
    return join.apply(path, [rootPath].concat(args));
  };
}

const getRootRelativePath = getRelativePath(resolve(__dirname, '../../'));

export { getRelativePath, getRootRelativePath };
