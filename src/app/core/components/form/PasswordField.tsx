import { compose, mapProps, setDisplayName } from 'recompose';

import { PasswordInput } from '@core/components/form/PasswordInput';
import { fieldPropsMapper } from '@core/components/form/TextField';

const PasswordField = compose(
  setDisplayName('PasswordField'),
  mapProps(fieldPropsMapper)
)(PasswordInput);

export { PasswordField };
