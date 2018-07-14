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
  partialOK: boolean;
  recalc: boolean;
  scrollVisible: boolean;
  scrollTimer: any;
}

@CSSModules(styles, { allowMultiple: true })
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
      partialOK: true,
      recalc: true,
      scrollVisible: false,
      scrollTimer: undefined
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
        partialOK: true,
        recalc: true
      });
      e.preventDefault();
    }
  }

  private onWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const { nlpDialog } = this.props;
    const { showFrom, showTo, scrollTimer } = this.state;

    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    if (e.deltaY < 0) {
      if (showFrom > 0) {
        this.setState({
          showFrom: showFrom - 1,
          showTo: showTo - 1,
          partialOK: false,
          recalc: true,
          scrollVisible: true,
          scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
        });
      } else {
        this.setState({
          partialOK: false,
          recalc: true,
          scrollVisible: true,
          scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
        });
      }
    }
    else if (e.deltaY > 0 && showTo < nlpDialog.items.size - 1 ) {
      this.setState({
        showFrom: showFrom + 1,
        showTo: showTo + 1,
        partialOK: true,
        recalc: true,
        scrollVisible: true,
        scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
      });
    }
    else {
      this.setState({
        scrollVisible: true,
        scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
      });
    }
  }

  private doScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const { nlpDialog } = this.props;
    const { showFrom, showTo } = this.state;
    const pos = e.clientY / e.currentTarget.clientHeight;
    const page = showTo - showFrom + 1;
    const center = Math.trunc(nlpDialog.items.size * pos);
    let newFrom = Math.trunc(center - page / 2);
    if (newFrom < 0) { newFrom = 0 };
    let newTo = newFrom + page - 1;
    if (newTo > nlpDialog.items.size - 1) {
      newTo = nlpDialog.items.size - 1;
    }
    this.setState({ showFrom: newFrom, showTo: newTo, partialOK: !!newFrom, recalc: true });
  }

  private onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) {
      e.preventDefault();

      const { nlpDialog } = this.props;
      const { showFrom, showTo } = this.state;
      const pos = e.clientY / e.currentTarget.clientHeight;
      const page = showTo - showFrom + 1;
      let newFrom: number;
      let newTo: number;

      if (pos < 0.5) {
        newFrom = showFrom - page;
        newTo = showTo - page;
      } else {
        newFrom = showFrom + page;
        newTo = showTo + page;
      }

      if (newFrom < 0) {
        newFrom = 0;
      }

      if (newFrom >= nlpDialog.items.size) {
        newFrom = nlpDialog.items.size - 1;
      }

      if (newTo < newFrom) {
        newTo = newFrom;
      }

      if (newTo >= nlpDialog.items.size) {
        newTo = nlpDialog.items.size - 1;
      }

      this.setState({ showFrom: newFrom, showTo: newTo, partialOK: pos >= 0.5, recalc: true });
    }
  }

  private onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (e.buttons === 1) {
      e.preventDefault();
      this.doScroll(e);
    }
  }

  private calcVisibleCount() {
    const { nlpDialog } = this.props;
    const { showFrom, showTo, recalc, partialOK } = this.state;

    if (!recalc) return;

    if (this.shownItems.length) {
      if (this.shownItems[0].offsetTop > 38) {
        if (this.shownItems.length < nlpDialog.items.size && showFrom > 0) {
          this.setState({ showFrom: showFrom - 1 });
        } else {
          this.setState({ recalc: false });
        }
      }
      else if (this.shownItems[0].offsetTop + this.shownItems[0].offsetHeight < 0 && showFrom < showTo) {
        this.setState({
          showFrom: showFrom + 1,
          recalc: true
        });
      }
      else if (this.shownItems[0].offsetTop < 0 && !partialOK && !showFrom && showFrom < showTo) {
        this.setState({
          showTo: showTo - 1,
          recalc: false
        });
      }
      else {
        this.setState({ recalc: false });
      }
    } else {
      this.setState({
        showFrom: 0,
        showTo: 0,
        recalc: false
      });
    }
  }

  public componentDidMount() {
    //this.setState({ recalc: true });
    setTimeout( () => this.setState({ recalc: true }), 200);
    //this.calcVisibleCount();
  }

  public componentDidUpdate() {
    this.calcVisibleCount();
  }

  public render() {
    const { nlpDialog } = this.props;
    const { showFrom, showTo, scrollVisible } = this.state;
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
            <div styleName={scrollVisible ? "NLPScrollBarVisible" : "NLPScrollBar"} onMouseDown={this.onMouseDown.bind(this)} onMouseMove={this.onMouseMove.bind(this)}>
              <div styleName="NLPScrollBarThumb" style={{ height: thumbHeight, top: thumbTop }} />
            </div>
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