import * as React from 'react';

import { IWPPage } from '@srcTypes/models';

import Content from '@components/Content';

interface IOwnProps {
  pageData: IWPPage;
  pageType: string;
}

type TAllProps = IOwnProps;

const Page:React.FC<TAllProps> = ( props: TAllProps ) => {
  const { pageData, pageType } = props;

  const renderExcerpt = () => {
    const { content } = pageData;

    return (
      <p>
        <Content
          contentClass="textMultiLineEllipsis"
        >
          {content}
        </Content>
      </p>
    );
  }

  return (
    <div>
      <span>lazy gets the state</span>
      <span>{pageType}</span>
      <span className="target">
        {renderExcerpt()}
      </span>
    </div>
  )
}

export default Page;
