import { compose, mapProps, setDisplayName } from 'recompose';
import TextInput from '@material-ui/core/TextField';

// TODO types

function fieldPropsMapper({ input: { name, value, onChange }, meta: { touched, error }, ...customProps }: any) {
  return {
    style: { marginTop: '10px' },
    fullWidth: true,
    error: touched && !!error,
    helperText: touched && !!error ? error : null,
    name,
    value,
    onChange, // TODO test
    ...customProps
  };
}

const TextField = compose(
  setDisplayName('TextField'),
  mapProps(fieldPropsMapper)
)(TextInput);

export { TextField, fieldPropsMapper };
