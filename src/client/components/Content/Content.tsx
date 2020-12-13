import React, { FC } from 'react'
import styled from 'styled-components'

import { IStyle } from '@srcTypes/models'

interface IOwnProps {
  contentClass: string
  children: any
  key: any
  inlineStyle?: IStyle
}

const defaultTheme: IStyle = {
  backgroundColor: 'unset',
  padding: 'unset',
  color: 'rgba(0,0,0,1)',
  fontSize: '1rem',
}

const ContentDiv = ({ key, contentClass, html }: any) => {
  return (
    <div
      key={key}
      className={contentClass}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const StyledDiv = styled(ContentDiv)`
  background-color: ${(props: any) => props.theme.backgroundColor}
  padding: ${(props: any) => props.theme.padding}
  color: ${(props: any) => props.theme.color}
  font-size: ${(props: any) => props.theme.fontSize}
`

const Content: FC<IOwnProps> = (props: IOwnProps) => {
  const {
    contentClass, children, key, inlineStyle = {},
  } = props

  const theme = Object.assign(defaultTheme, inlineStyle)
  const filteredChildren = children ? children.replace(/\n/g, "<br />") : ''

  return (
    <StyledDiv
      key={key}
      contentClass={contentClass}
      theme={theme}
      html={filteredChildren}
    />
  )
}

export default Content
