import React, { Component, Fragment, ChangeEvent } from 'react';
import CSSModules from 'react-css-modules';
import { NLPDialog } from 'gdmn-nlp-agent';

const styles = require('./NLPDialogScroll.css');
const topGap = 24;
const scrollTimerDelay = 4000;

interface INLPDialogScrollProps {
  nlpDialog: NLPDialog;
  onSetText: (text: string) => any;
}

interface INLPDialogScrollState {
  text: string;
  showFrom: number;
  showTo: number;
  partialOK: boolean;
  recalc: boolean;
  scrollVisible: boolean;
  scrollTimer: any;
  prevClientY?: number;
  prevFrac: number;
}

@CSSModules(styles, { allowMultiple: true })
class NLPDialogScroll extends Component<INLPDialogScrollProps, INLPDialogScrollState> {
  public shownItems: HTMLDivElement[] = [];
  public state: INLPDialogScrollState;

<<<<<<< HEAD
  shownItems: HTMLDivElement[] = [];
  scrollThumb: HTMLDivElement | undefined | null;
  state: INLPDialogScrollState;

  constructor (props: INLPDialogScrollProps) {
=======
  constructor(props: INLPDialogScrollProps) {
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
    super(props);
    const { nlpDialog } = this.props;
    this.state = {
      text: '',
      showFrom: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      showTo: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      partialOK: true,
      recalc: true,
      scrollVisible: false,
<<<<<<< HEAD
      scrollTimer: undefined,
      prevClientY: -1,
      prevFrac: 0
    }
=======
      scrollTimer: undefined
    };
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
    this.calcVisibleCount = this.calcVisibleCount.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  private onPressEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
<<<<<<< HEAD
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
=======
    if (!(e.key === 'Enter' && this.state.text.trim())) return;

    const { nlpDialog, onSetText } = this.props;
    onSetText(this.state.text.trim());
    this.setState({
      text: '',
      showFrom: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      showTo: nlpDialog.items.size ? nlpDialog.items.size - 1 : 0,
      recalc: true
    });
    e.preventDefault();
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
  }

  private onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const delayedScrollHide = () => ({
      scrollVisible: true,
      scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), scrollTimerDelay)
    });

    e.preventDefault();
    const { nlpDialog } = this.props;
    const { showFrom, showTo, scrollTimer } = this.state;

    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

<<<<<<< HEAD
    if (e.deltaY < 0) {
      if (showFrom > 0) {
        this.setState({
          showFrom: showFrom - 1,
          showTo: showTo - 1,
          partialOK: false,
          recalc: true,
          ...delayedScrollHide()
        });
      } else {
        this.setState({
          partialOK: false,
          recalc: true,
          ...delayedScrollHide()
        });
      }
    }
    else if (e.deltaY > 0 && showTo < nlpDialog.items.size - 1 ) {
=======
    if (e.deltaY < 0 && showFrom > 0) {
      this.setState({
        showFrom: showFrom - 1,
        showTo: showTo - 1,
        recalc: true,
        scrollVisible: true,
        scrollTimer: setTimeout(() => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
      });
    } else if (e.deltaY > 0 && showTo < nlpDialog.items.size - 1) {
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
      this.setState({
        showFrom: showFrom + 1,
        showTo: showTo + 1,
        partialOK: true,
        recalc: true,
<<<<<<< HEAD
        ...delayedScrollHide()
=======
        scrollVisible: true,
        scrollTimer: setTimeout(() => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
      });
    } else {
      this.setState({
<<<<<<< HEAD
        ...delayedScrollHide()
=======
        scrollVisible: true,
        scrollTimer: setTimeout(() => this.setState({ scrollVisible: false, scrollTimer: undefined }), 4000)
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
      });
    }
  }

  private onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();

    if (e.currentTarget === e.target && this.scrollThumb) {
      const { nlpDialog } = this.props;
      const { showFrom, showTo } = this.state;

      const above = e.clientY <= this.scrollThumb.getBoundingClientRect().top;
      const page = showTo - showFrom + 1;
      let newFrom: number;
      let newTo: number;

      if (above) {
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

      this.setState({ showFrom: newFrom, showTo: newTo, partialOK: !above, recalc: true });
    } else {
      e.currentTarget.setPointerCapture(e.pointerId);
      this.setState({ scrollVisible: true, prevClientY: e.clientY, prevFrac: 0 });
    }
  }

  private onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const { nlpDialog } = this.props;
<<<<<<< HEAD
    const { showFrom, showTo, prevClientY, prevFrac } = this.state;

    if (e.buttons === 1 && typeof(prevClientY) === 'number' && nlpDialog.items.size) {
      e.preventDefault();

      const deltaY = e.clientY - prevClientY;
      const deltaPrecise = deltaY / (e.currentTarget.clientHeight / nlpDialog.items.size);
      const deltaCorrected = deltaPrecise + prevFrac;
      const delta = Math.trunc(deltaCorrected);

      if (delta) {
        if (showFrom === 0 && delta < 0) {
          this.setState({
            partialOK: false,
            recalc: true
          });
        } else {
          let newFrom = showFrom + delta;
          if (newFrom < 0) newFrom = 0;
          let newTo = showTo + delta;
          if (newTo >= nlpDialog.items.size) newTo = nlpDialog.items.size - 1;
          if (newFrom > newTo) newFrom = newTo;
          this.setState({
            showFrom: newFrom,
            showTo: newTo,
            partialOK: !!newFrom,
            recalc: true,
            prevClientY: e.clientY,
            prevFrac: deltaCorrected - delta
          });
        }
      }
    }
  }
=======
    const { showFrom, showTo } = this.state;
    const pos = e.clientY / e.currentTarget.clientHeight;
    const ht = showTo - showFrom + 1;
    const center = Math.trunc(nlpDialog.items.size * pos);
    let newFrom = Math.trunc(center - ht / 2);
    if (newFrom < 0) {
      newFrom = 0;
    }
    let newTo = newFrom + ht - 1;
    if (newTo > nlpDialog.items.size - 1) {
      newTo = nlpDialog.items.size - 1;
    }
    this.setState({ showFrom: newFrom, showTo: newTo, recalc: true });
  };
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561

  private onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.releasePointerCapture(e.pointerId);
    const { scrollTimer } = this.state;

    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    this.setState({
      scrollVisible: true,
      scrollTimer: setTimeout( () => this.setState({ scrollVisible: false, scrollTimer: undefined }), scrollTimerDelay),
      prevClientY: undefined,
      prevFrac: 0
    });
  }

  private calcVisibleCount() {
    const { nlpDialog } = this.props;
<<<<<<< HEAD
    const { showFrom, showTo, recalc, partialOK } = this.state;
=======
    const { showFrom, showTo, recalc } = this.state;
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561

    if (!recalc) return;

    if (this.shownItems.length) {
<<<<<<< HEAD
      if (this.shownItems[0].offsetTop > topGap) {
=======
      if (this.shownItems[0].offsetTop > 38) {
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
        if (this.shownItems.length < nlpDialog.items.size && showFrom > 0) {
          this.setState({ showFrom: showFrom - 1 });
        } else {
          this.setState({ recalc: false });
<<<<<<< HEAD
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
=======
        }
      } else if (this.shownItems[0].offsetTop <= 0) {
        if (this.shownItems.length > 1 && this.shownItems[1].offsetTop > 0) {
          this.setState({ recalc: false });
        } else if (showFrom < showTo) {
          this.setState({
            showFrom: showFrom + 1,
            recalc: false
          });
        } else {
          this.setState({ recalc: false });
        }
      }
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
    } else {
      this.setState({
        showFrom: 0,
        showTo: 0,
        recalc: false
      });
    }
  }

  public componentDidMount() {
<<<<<<< HEAD
    //this.setState({ recalc: true });
    setTimeout( () => this.setState({ recalc: true }), 200);
    //this.calcVisibleCount();
=======
    setTimeout(() => this.setState({ recalc: true }), 200);
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
  }

  public componentDidUpdate() {
    this.calcVisibleCount();
  }

  public render() {
    const { nlpDialog } = this.props;
    const { showFrom, showTo, scrollVisible } = this.state;
    const thumbHeight = `${Math.trunc(((showTo - showFrom + 1) / nlpDialog.items.size) * 100).toString()}%`;
    const thumbTop = `${Math.trunc((showFrom / nlpDialog.items.size) * 100).toString()}%`;
    this.shownItems = [];
    return (
      <Fragment>
        <div styleName="NLPDialog">
<<<<<<< HEAD
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
            <div
              styleName={scrollVisible ? "NLPScrollBarVisible" : "NLPScrollBar"}
              onPointerDown={this.onPointerDown.bind(this)}
              onPointerUp={this.onPointerUp.bind(this)}
              onPointerMove={this.onPointerMove.bind(this)}
            >
              <div styleName="NLPScrollBarThumb" style={{ height: thumbHeight, top: thumbTop }} ref={ elem => this.scrollThumb = elem } />
=======
          <div styleName="NLPItems" onWheel={this.onWheel}>
            {nlpDialog &&
              nlpDialog.items.map(
                (i, idx) =>
                  i &&
                  typeof idx === 'number' &&
                  idx >= this.state.showFrom &&
                  idx <= this.state.showTo && (
                    <div key={idx} styleName="NLPItem" ref={elem => elem && this.shownItems.push(elem)}>
                      <span styleName="Circle">{i.who}</span>
                      <span styleName="Message">{i.text}</span>
                    </div>
                  )
              )}
            <div
              styleName={scrollVisible ? 'NLPScrollBarVisible' : 'NLPScrollBar'}
              onMouseDown={this.onMouseDown}
              onMouseMove={this.onMouseMove}
            >
              <div styleName="NLPScrollBarThumb" style={{ height: thumbHeight, top: thumbTop }} />
>>>>>>> 1250cc60032c50a89d2d0939152967bcb3786561
            </div>
          </div>
          <div styleName="NLPInput">
            <textarea
              spellCheck={false}
              value={this.state.text}
              onKeyPress={this.onPressEnter}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ text: e.target.value })}
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

export { NLPDialogScroll };
