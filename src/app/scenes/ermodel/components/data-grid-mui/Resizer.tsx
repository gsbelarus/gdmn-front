import React, { PureComponent } from 'react';
import { DraggableCore, DraggableData } from 'react-draggable';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';

const styles = require('./Resizer.css');

interface IResizerProps {
  onWidthChange: (args: { shift: number }) => void;
  onWidthDraft: (args: { shift: number }) => void;
  onWidthDraftCancel: () => void;
  resizeHandleOpacityClass: string;
}

interface IResizerState {
  resizing: boolean;
}

@CSSModules(styles)
class Resizer extends PureComponent<IResizerProps, IResizerState> {
  public state = {
    resizing: false
  };

  private resizeStartingX: number = 0;

  constructor(props: any) {
    super(props);

    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResizeUpdate = this.onResizeUpdate.bind(this);
    this.onResizeEnd = this.onResizeEnd.bind(this);
  }

  private onResizeStart(e: Event, { x }: DraggableData) {
    this.resizeStartingX = x;

    this.setState({ resizing: true });
  }

  private onResizeUpdate(e: Event, { x }: DraggableData) {
    const { onWidthDraft } = this.props;

    onWidthDraft({ shift: x - this.resizeStartingX });
  }

  private onResizeEnd(e: Event, { x }: DraggableData) {
    const { onWidthChange, onWidthDraftCancel } = this.props;

    onWidthDraftCancel();
    onWidthChange({ shift: x - this.resizeStartingX });

    this.setState({ resizing: false });
  }

  public render(): JSX.Element {
    const { resizeHandleOpacityClass } = this.props;
    const { resizing } = this.state;

    return (
      <DraggableCore onDrag={this.onResizeUpdate} onStart={this.onResizeStart} onStop={this.onResizeEnd}>
        <div
          styleName={classNames({
            ['resize-handle']: true,
            ['resize-handle-active']: resizing
          })}
        >
          <div
            className={resizeHandleOpacityClass}
            styleName={classNames({
              ['resize-handle-line']: true,
              ['resize-handle-line-first']: true,
              ['resize-handle-line-active']: resizing
            })}
          />
          <div
            className={resizeHandleOpacityClass}
            styleName={classNames({
              ['resize-handle-line']: true,
              ['resize-handle-line-second']: true,
              ['resize-handle-line-active']: resizing
            })}
          />
        </div>
      </DraggableCore>
    );
  }
}

export { Resizer, IResizerProps, IResizerState };
