import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

interface IBooleanFieldProps {
  style?: object;
  data: object | boolean;
  getValue: (data: object | boolean) => boolean;
}

class BooleanField extends React.Component<IBooleanFieldProps, any> {
  // TODO pure

  public static defaultProps = {
    style: {
      // TODO css modules
      display: 'block',
      margin: 'auto'
    },
    getValue: (data: object | string) => (typeof data === 'object' ? JSON.stringify(data) : data)
  };

  public render(): JSX.Element {
    const { getValue, data, style } = this.props;

    const value = getValue(data);
    const Component = !!value ? (value === true ? DoneIcon : ClearIcon) : 'span';
    return <Component style={style} />;
  } // todo React.Fragment
}

export { BooleanField, IBooleanFieldProps };
