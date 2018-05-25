import React from 'react';
import ContentLoader, { ContentLoaderProps } from 'react-content-loader';

class TextSkeleton extends React.Component<ContentLoaderProps, any> {
  // TODO types
  private static genWidth() {
    const width = 75 - Math.floor(Math.random() * 11) * 5;
    return width; // FIXME `${width}%`
  }

  private width = TextSkeleton.genWidth();

  public render() {
    const { style = {}, ...otherProps } = this.props;

    return (
      <ContentLoader width={this.width} style={{ height: '10', ...style }} {...otherProps}>
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
      </ContentLoader>
    );
  }
}

export default TextSkeleton;
