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

const round = (value: number) => Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2);
const bytesToMb = (value: number) => (value > 0 ? round(value / 1024 / 1024) : 0);

// todo tmp
function formatDateToLocalLong(date: Date) {
  if (!date) return date;
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export { promisify, isDevMode, Subtract, bytesToMb, formatDateToLocalLong };
