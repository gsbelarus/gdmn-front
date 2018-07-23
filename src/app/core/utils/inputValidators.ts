// TODO throw ValidationError

const requiredValidate = (value: any) => (value ? undefined : 'Required');

const emailValidate = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

// TODO
const passwordValidate = (value: string) => (value && value.length > 5 ? 'Invalid password address' : undefined);

const maxLengthValidate = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const numberValidate = (value: number) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

const minValueValidate = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

const ageValidate = (value: number) => (value && value > 65 ? 'You might be too old for this' : undefined);

export {
  requiredValidate,
  emailValidate,
  passwordValidate,
  maxLengthValidate,
  numberValidate,
  minValueValidate,
  ageValidate
};
