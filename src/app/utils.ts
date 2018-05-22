function isDevMode() {
  return process.env.NODE_ENV !== 'production';
}

export { isDevMode };
