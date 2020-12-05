import React, { FC } from 'react';
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models';

interface IOwnProps {
  contentClass: string;
  children: any;
  key: any;
  inlineStyle?: IStyle;
}

const ContentDiv = styled.div`
  background-color: ${(props: any) => props.theme.backgroundColor};
  padding: ${(props: any) => props.theme.padding};
  color: ${(props: any) => props.theme.color};
  font-size: ${(props: any) => props.theme.fontSize};
`;

const defaultTheme: IStyle = {
  backgroundColor: 'unset',
  padding: 'unset',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
};

const Content: FC<IOwnProps> = (props: IOwnProps) => {
  const {
    contentClass, children, key, inlineStyle = {},
  } = props;

  const theme = Object.assign(defaultTheme, inlineStyle);

  return (
    <ContentDiv
      key={key}
      className={contentClass}
      theme={theme}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default Content;
