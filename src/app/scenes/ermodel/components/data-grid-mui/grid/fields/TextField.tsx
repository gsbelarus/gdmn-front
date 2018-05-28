import React from 'react';

interface TextFieldProps {
  style?: object;
  data: object | string;
  getValue: (data: object | string) => string;
}

class TextField extends React.Component<TextFieldProps, any> {
  // TODO pure

  public defaultProps = {
    getValue: (data: object | string) => (typeof data === 'object' ? JSON.stringify(data) : data)
  };

  public render(): JSX.Element {
    const { getValue, data, style } = this.props;

    return (
      // TODO Typography
      <span style={style}>{getValue(data)}</span>
    );
  } // todo React.Fragment
}

export { TextField, TextFieldProps };
