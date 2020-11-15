import React, { PureComponent } from 'react';

interface IOwnProps {
  contentClass: string;
  children: any;
}

class Content extends PureComponent<IOwnProps> {
  render() {
    const {
      contentClass, children,
    } = this.props;

    return (
      <div
        className={contentClass}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }
}

export default Content;
