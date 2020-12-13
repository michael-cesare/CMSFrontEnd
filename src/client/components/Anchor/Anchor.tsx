import React, { FC } from "react";
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models';

interface IOwnProps {
  to: string;
  contentClass?: string;
  children: any;
  id: number;
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
  padding: 'unset',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
};

type TAllProps = IOwnProps;

const Anchor: FC<TAllProps> = (props: TAllProps) => {
  const {
    to, contentClass = '', children, id, inlineStyle = {},
  } = props;

  const theme = Object.assign(defaultTheme, inlineStyle);

  return (
    <AnchorA
      key={`AnchorA-${id}`}
      className={contentClass}
      href={to}
      theme={theme}
    >
      {children}
    </AnchorA>
  );
}

export default Anchor;
