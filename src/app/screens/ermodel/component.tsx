import * as React from 'react';
import { ERModel } from 'gdmn-orm';
import Button from '@material-ui/core/Button';
import * as CSSModules from 'react-css-modules';

export interface ERModelBoxProps extends CSSModules.InjectedCSSModuleProps {
  readonly erModel: ERModel;
  readonly err: string;
  readonly onLoad: () => any;
}

export class ERModelBox extends React.Component<ERModelBoxProps, {}> {
  render() {
    const { erModel, err, onLoad } = this.props;

    return (
      <div>
        <div>{err}</div>
        <div>{`загружено сущностей: ${Object.entries(erModel.entities).length}`}</div>
        <Button onClick={onLoad}>Загрузить</Button>
      </div>
    );
  }
}
