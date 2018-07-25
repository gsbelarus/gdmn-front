function promisify<T>(fn: Function, context = null): (...args: any[]) => Promise<T> {
  return (...args) =>
    new Promise<T>((resolve, reject) => {
      fn.call(
        context,
        ...[
          ...args,
          (err: any, ...results: any[]) => {
            err ? reject(err) : resolve(results.length ? results[0] : results);
          }
        ]
      );
    });
}

function isDevMode() {
  return JSON.stringify(process.env.NODE_ENV) !== 'production';
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export { promisify, isDevMode, Subtract };
