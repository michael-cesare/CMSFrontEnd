import * as React from 'react';

import Content from '@components/Content';

import { IPage } from '@client/types';

interface IOwnProps {
  page: IPage;
}

type TAllProps = IOwnProps;

const Page:React.FC<TAllProps> = ( props: TAllProps ) => {
  const { page } = props;

  const renderExcerpt = () => {
    const { domNodes } = page;

    const domContent = domNodes.map( ( { content, id } ) => {
      return (
        <div key={id}>
          <Content
            contentClass="textMultiLineEllipsis"
          >
            {content}
          </Content>
        </div>
      );
    } );

    return (
      <div className="page-container-nodes">
        {domContent}
      </div>
    );
  }

  return (
    <div className="page-container">
      {renderExcerpt()}
    </div>
  )
}

export default Page;
