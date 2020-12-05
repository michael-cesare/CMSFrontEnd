import React, { FC } from "react";
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models';

import Anchor from '@client/components/Anchor/Anchor';

interface IOwnProps {
  to: string;
  contentClass?: string;
  children: any;
  key: any;
  inlineStyle?: IStyle;
}

const Item = styled.li`
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

const NavItem: FC<TAllProps> = (props: TAllProps) => {
  const {
    to, contentClass = '', children, key, inlineStyle = {},
  } = props;

  const theme = Object.assign(defaultTheme, inlineStyle);

  return (
    <Item
      key={key}
      theme={theme}
    >
      <Anchor
        key={key}
        to={to}
        contentClass={contentClass}
      >
        {children}
      </Anchor>
    </Item>
  );
}

export default NavItem;
