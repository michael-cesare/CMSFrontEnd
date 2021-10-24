import React, { FC } from 'react'
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models'

interface IOwnProps {
  contentClass: string
  children?: any
  uid: any
  inlineStyle?: IStyle
}

const defaultTheme: IStyle | any = {
  backgroundColor: 'unset',
  padding: 'unset',
  color: 'unset',
  fontSize: '1rem',
  textAlign: 'left',
}

const ContentDiv = ({ uid, contentClass, html }: any) => {
  return (
    <div
      key={uid}
      className={contentClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const Wrapper = styled.div`
  background-color: ${(props: any) => props.theme.backgroundColor};
  padding: ${(props: any) => props.theme.padding};
  color: ${(props: any) => props.theme.color};
  font-size: ${(props: any) => props.theme.fontSize};
  text-align: ${(props: any) => props.theme.textAlign};
`;

const Content: FC<IOwnProps> = (props: IOwnProps) => {
  const {
    contentClass, children, uid, inlineStyle = {},
  } = props

  const theme = Object.assign(defaultTheme, inlineStyle)
  const filteredChildren = children && children.replace ? children.replace(/\n/g, "<br />") : ''

  return (
    <Wrapper
      key={uid}
      theme={theme}
    >
      <ContentDiv
        uid={uid}
        contentClass={contentClass}
        html={filteredChildren}
      />
    </Wrapper>
  )
}

export default Content
