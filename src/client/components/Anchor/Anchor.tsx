import React, { FC } from "react";
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models';

interface IOwnProps {
  to: string;
  contentClass?: string;
  children: any;
  key: any;
  inlineStyle?: IStyle;
}

const AnchorA = styled.a`
  background-color: ${(props: any) => props.theme.backgroundColor};
  padding: ${(props: any) => props.theme.padding};
  color: ${(props: any) => props.theme.color};
  font-size: ${(props: any) => props.theme.fontSize};
`;

const defaultTheme: IStyle = {
  backgroundColor: 'unset',
  padding: 'none',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
};

type TAllProps = IOwnProps;

const Anchor: FC<TAllProps> = (props: TAllProps) => {
  const {
    to, contentClass = '', children, key, inlineStyle = {},
  } = props;

  const theme = Object.assign(defaultTheme, inlineStyle);

  return (
    <AnchorA
      key={key}
      className={contentClass}
      href={to}
      theme={theme}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}

export default Anchor;