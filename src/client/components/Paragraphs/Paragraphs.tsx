import * as React from 'react';
import styled from 'styled-components'

import Content from '@components/Content';

import { IPageTemplateParagraphs, IStyle } from '@srcTypes/models';

interface IOwnProps {
  paragraphs: IPageTemplateParagraphs,
  index?: number;
}

type TAllProps = IOwnProps;

const ParagraphsDiv = styled.div`
  background-color: ${(props: any) => props.theme.backgroundColor};
  padding: ${(props: any) => props.theme.padding};
  color: ${(props: any) => props.theme.color};
  font-size: ${(props: any) => props.theme.fontSize};
`;

const defaultTheme: IStyle = {
  backgroundColor: 'rgba(255,255,255,1)',
  padding: '.5rem',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
};

const Paragraphs: React.FC<TAllProps> = (props: TAllProps) => {
  const { paragraphs, index } = props;

  const renderTitle = (): JSX.Element => {
    const { title: { text, style } } = paragraphs;

    return (
      <Content
        contentClass="paragraph-title"
        key={`paragraph-title-${index}`}
        inlineStyle={style}
      >
        {text}
      </Content>
    );
  }

  const renderParagraphs = (): JSX.Element[] => {
    const { content } = paragraphs;

    return content.map(( { text, style }, key) => (
      <Content
        contentClass="paragraph-info"
        key={`paragraph-info-${key}`}
        inlineStyle={style}
      >
        {text}
      </Content>
    ) );
  }
  
  const theme = Object.assign(defaultTheme, paragraphs.style);

  return (
    <ParagraphsDiv
      key={`paragraphs-${index || 0}`}
      className="paragraphs"
      theme={theme}
    >
      {renderTitle()}
      {renderParagraphs()}
    </ParagraphsDiv>
  )
}

export default Paragraphs;
