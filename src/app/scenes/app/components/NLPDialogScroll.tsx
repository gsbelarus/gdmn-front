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

  private onPressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && this.state.text.trim()) {
      this.props.onSetText(this.state.text);
      this.setState({ text: '' });
      e.preventDefault();
    }
  }

  public componentDidMount() {

  }

  public render() {
    const { nlpDialog } = this.props;
    return (
      <Fragment>
        <div styleName="NLPDialog">
          {nlpDialog && nlpDialog.items.map( (i, idx) => i && <div key={idx} styleName="NLPItem"><span styleName="Circle">{i.who}</span><span styleName="Message">{i.text}</span></div>)}
          <div styleName="NLPInput">
            <textarea
              spellCheck={false}
              value={this.state.text}
              onKeyPress={this.onPressEnter.bind(this)}
              onChange={ (e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ text: e.target.value }) }
            />
          </div>
        </div>
        <svg height="0" width="0">
          <defs>
            <clipPath id="left-droplet">
              <path d="M 10,0 A 10,10 0 0 1 0,10 H 16 V 0 Z" />
            </clipPath>
            <clipPath id="right-droplet">
              <path d="M 6,0 A 10,10 0 0 0 16,10 H 0 V 0 Z" />
            </clipPath>
          </defs>
        </svg>
      </Fragment>
    );
  }
}