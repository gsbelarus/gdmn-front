import React, { Component, Fragment, ChangeEvent } from 'react';
import CSSModules from 'react-css-modules';
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

  private onWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const { nlpDialog } = this.props;
    const { showFrom, showTo } = this.state;
    if (e.deltaY < 0 && showFrom > 0) {
      this.setState({ showFrom: showFrom - 1, showTo: showTo - 1, recalc: true });
    }
    else if (e.deltaY > 0 && showTo < nlpDialog.items.size - 1 ) {
      this.setState({ showFrom: showFrom + 1, showTo: showTo + 1, recalc: true });
    }
  }

  private onClick(e: React.MouseEvent<HTMLDivElement>) {

  }

  private onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const { nlpDialog } = this.props;
    const { showFrom, showTo } = this.state;
    const pos = e.clientY / e.currentTarget.clientHeight;
    const ht = showTo - showFrom + 1;
    const center = Math.trunc(nlpDialog.items.size * pos);
    let newFrom = Math.trunc(center - ht / 2);
    if (newFrom < 0) { newFrom = 0 };
    let newTo = newFrom + ht - 1;
    if (newTo > nlpDialog.items.size - 1) {
      newTo = nlpDialog.items.size - 1;
    }
    this.setState({ showFrom: newFrom, showTo: newTo, recalc: true });
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
          if (this.shownItems.length > 1 && this.shownItems[1].offsetTop > 0) {
            this.setState({ recalc: false });
          }
          else if (showFrom < showTo) {
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
    setTimeout( () => this.setState({ recalc: true }), 200);
  }

  public componentDidUpdate() {
    this.calcVisibleCount();
  }

  public render() {
    const { nlpDialog } = this.props;
    const { showFrom, showTo } = this.state;
    let thumbHeight = `${Math.trunc((showTo - showFrom + 1) / nlpDialog.items.size * 100).toString()}%`;
    let thumbTop = `${Math.trunc(showFrom / nlpDialog.items.size * 100).toString()}%`;
    this.shownItems = [];
    return (
      <Fragment>
        <div styleName="NLPDialog">
          <div styleName="NLPItems" onWheel={this.onWheel.bind(this)} >
            {
              nlpDialog && nlpDialog.items.map(
                (i, idx) => i && typeof idx === 'number' && idx >= this.state.showFrom && idx <= this.state.showTo &&
                  <div key={idx} styleName="NLPItem" ref={ elem => elem && this.shownItems.push(elem) } >
                    <span styleName="Circle">{i.who}</span>
                    <span styleName="Message">{i.text}</span>
                  </div>
              )
            }
            {
              showFrom || showTo < nlpDialog.items.size - 1 ?
                <div styleName="NLPScrollBar" onClick={this.onClick.bind(this)} onMouseDown={this.onMouseDown.bind(this)}>
                  <div styleName="NLPScrollBarThumb" style={{ height: thumbHeight, top: thumbTop }} />
                </div>
              : null
            }
          </div>
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