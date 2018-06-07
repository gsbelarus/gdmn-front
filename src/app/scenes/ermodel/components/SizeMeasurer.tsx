import React, { CSSProperties, PureComponent, ReactChild } from 'react';

interface ISizeMeasurerProps {
  children: ({ width, height }: { width: number; height: number }) => ReactChild | ReactChild[]; // ReactChild | ReactChild[];
  style?: object;
}

// todo auto-size? resizable ? scrollable ?
// https://github.com/Theadd/react-panels/blob/master/src/jsx/addons/resizable-content.js
// https://github.com/nrako/react-component-resizable

const styles = {
  root: {
    position: 'relative'
  },
  triggers: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
    visibility: 'hidden',
    opacity: 0
  },
  expand: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto'
  },
  contract: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'auto'
  },
  contractTrigger: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '200%'
  }
};

interface ISizeMeasurerState {
  size: { width: number; height: number };
}

class SizeMeasurer extends PureComponent<ISizeMeasurerProps, ISizeMeasurerState> {
  public state = {
    size: { width: 0, height: 0 }
  };

  public defaultProps = {
    style: {}
  };

  private ref: HTMLDivElement | null = null;
  private expandRef: HTMLDivElement | null = null;
  private contractRef: HTMLDivElement | null = null;
  private expandTriggerRef: HTMLDivElement | null = null;

  constructor(props: ISizeMeasurerProps) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  public componentDidMount() {
    this.handleScroll();
  }

  private handleScroll() {
    if (!this.ref) return;

    const size = { height: this.ref.offsetHeight, width: this.ref.offsetWidth };

    if (this.contractRef) {
      this.contractRef.scrollTop = size.height;
      this.contractRef.scrollLeft = size.width;
    }
    if (this.expandTriggerRef) {
      this.expandTriggerRef.style.width = `${size.width + 1}px`;
      this.expandTriggerRef.style.height = `${size.height + 1}px`;
    }
    if (this.expandRef) {
      this.expandRef.scrollTop = 1;
      this.expandRef.scrollLeft = 1;
    }

    this.setState({ size });
  }

  public render(): JSX.Element {
    const { children, style } = this.props;
    const { size } = this.state;

    return (
      <div
        ref={node => {
          this.ref = node;
        }}
        style={{ ...(styles.root as CSSProperties), ...style }}
      >
        {children(size)}
        <div style={styles.triggers as CSSProperties}>
          <div
            ref={node => {
              this.expandRef = node;
            }}
            style={styles.expand as CSSProperties}
            onScroll={this.handleScroll}
          >
            <div
              ref={node => {
                this.expandTriggerRef = node;
              }}
            />
          </div>
          <div
            ref={node => {
              this.contractRef = node;
            }}
            style={styles.contract as CSSProperties}
            onScroll={this.handleScroll}
          >
            <div style={styles.contractTrigger as CSSProperties} />
          </div>
        </div>
      </div>
    );
  }
}

export { SizeMeasurer, ISizeMeasurerProps };
