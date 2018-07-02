import React, { Component, Fragment, ChangeEvent } from 'react';
import CSSModules from 'react-css-modules';
import Button from '@material-ui/core/Button/Button';
import { NLPDialog } from 'gdmn-nlp-agent';

const styles = require('./NLPDialogScroll.css');

interface INLPDialogScrollProps {
  nlpDialog: NLPDialog;
  onSetText: (text: string)=> any;
}

interface INLPDialogScrollState {
  text: string;
}

@CSSModules(styles)
export class NLPDialogScroll extends Component<INLPDialogScrollProps, INLPDialogScrollState> {

  state: INLPDialogScrollState = { text: '' };

  constructor (props: INLPDialogScrollProps) {
    super(props);
  }

  onPressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      this.props.onSetText(this.state.text);
      this.setState({ text: '' });
      e.preventDefault();
    }
  }

  public render() {
    const { nlpDialog } = this.props;
    return (
      <div styleName="NLPDialog">
        {nlpDialog && nlpDialog.items.map( (i, idx) => i && <div key={idx}>{i.text}</div>)}
        <div styleName="NLPInput">
          <textarea
            spellCheck={false}
            value={this.state.text}
            onKeyPress={this.onPressEnter.bind(this)}
            onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ text: e.target.value }) }
          />
        </div>
      </div>
    );
  }
}