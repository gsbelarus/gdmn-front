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
  showFrom: number;
  showTo: number;
  recalc: boolean;
}

@CSSModules(styles)
export class NLPDialogScroll extends Component<INLPDialogScrollProps, INLPDialogScrollState> {

  nlpDialogDiv: HTMLDivElement | null = null;
  shownItems: HTMLDivElement[] = [];
  state: INLPDialogScrollState;

  constructor (props: INLPDialogScrollProps) {
    super(props);
    const { nlpDialog } = this.props;
    this.state = {
      text: '',
      showFrom: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      showTo: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      recalc: true
    }
    this.calcVisibleCount = this.calcVisibleCount.bind(this);
  }

  private onPressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && this.state.text.trim()) {
      const { nlpDialog, onSetText } = this.props;
      onSetText(this.state.text.trim());
      this.setState({
        text: '',
        showFrom: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
        showTo: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
        recalc: true
      });
      e.preventDefault();
    }
  }

  private calcVisibleCount() {
    const { nlpDialog } = this.props;
    const { showFrom, showTo, recalc } = this.state;

    if (recalc) {
      if (this.shownItems.length) {
        if (this.shownItems[0].offsetTop > 38) {
          if (this.shownItems.length < nlpDialog.items.size && showFrom > 0) {
            this.setState({ showFrom: showFrom - 1 });
          } else {
            this.setState({ recalc: false });
          }
        }
        else if (this.shownItems[0].offsetTop <= 0) {
          if (showFrom < showTo) {
            this.setState({
              showFrom: showFrom + 1,
              recalc: false
            });
          } else {
            this.setState({ recalc: false });
          }
        }
      } else {
        this.setState({
          showFrom: 0,
          showTo: 0,
          recalc: false
        });
      }
    }
  }

  public componentDidMount() {
    setTimeout( () => this.setState({ recalc: true }), 100);
  }

  public componentDidUpdate() {
    this.calcVisibleCount();
  }

  public render() {
    const { nlpDialog } = this.props;
    this.shownItems = [];
    return (
      <Fragment>
        <div styleName="NLPDialog" ref={ elem => this.nlpDialogDiv = elem }>
          {
            nlpDialog && nlpDialog.items.map(
              (i, idx) => i && typeof idx === 'number' && idx >= this.state.showFrom && idx <= this.state.showTo &&
                <div key={idx} styleName="NLPItem" ref={ elem => elem && this.shownItems.push(elem) } >
                  <span styleName="Circle">{i.who}</span>
                  <span styleName="Message">{i.text}</span>
                </div>
            )
          }
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