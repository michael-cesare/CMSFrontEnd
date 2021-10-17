import React, { FC } from "react";
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models';

interface IOwnProps {
  contentClass?: string;
  children: any;
  id: string;
  inlineStyle?: IStyle;
}

const BriefBodyDiv = styled.div`
  background-color: ${(props: any) => props.theme.backgroundColor};
  padding: ${(props: any) => props.theme.padding};
  color: ${(props: any) => props.theme.color};
  font-size: ${(props: any) => props.theme.fontSize};
  text-align: ${(props: any) => props.theme.textAlign};
`;

const defaultTheme: IStyle = {
  backgroundColor: 'unset',
  padding: 'unset',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
};

type TAllProps = IOwnProps;

const BriefBody: FC<TAllProps> = (props: TAllProps) => {
  const { contentClass = '', children, id, inlineStyle = {} } = props;

  const theme = Object.assign(defaultTheme, inlineStyle);

  return (
    <BriefBodyDiv
      key={`brief-body-div-${id}`}
      className={contentClass}
      theme={theme}
    >
      {children}
    </BriefBodyDiv>
  );
}

export default BriefBody;
