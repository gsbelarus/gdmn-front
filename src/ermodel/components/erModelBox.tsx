import * as React from 'react';
import { ERModel } from 'gdmn-orm';
import { Button } from '@material-ui/core';

export interface ERModelBoxProps {
  readonly erModel: ERModel;
  readonly err: string;
  readonly onLoad: () => any;
}

export class ERModelBox extends React.Component<ERModelBoxProps, {}> {
  render() {
    const { erModel, err, onLoad } = this.props;

    return (
      <div>
        <div>
          {err}
        </div>
        <div>
          {`загружено сущностей: ${Object.entries(erModel.entities).length}`}
        </div>
        <Button onClick={onLoad}>Загрузить</Button>
      </div>
    );
  }
}