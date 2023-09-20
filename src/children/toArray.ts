import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { isFragment } from 'react-is'

export interface Option {
  /**
     * 保留空节点
     */
  keepEmpty?: boolean
}

export default function toArray(
  children: ReactNode
  , option: Option = {}) {
  let ret: ReactElement[] = []
  React.Children.forEach(children, (child: any | any[]) => {
    if ((child === undefined || child === null)
            && !option.keepEmpty)
      return

    if (Array.isArray(child))
      ret = ret.concat(toArray(child))
    else if (isFragment(child) && child.props)
      ret = ret.concat(toArray(child.props.children, option))
    else
      ret.push(child)
  })

  return ret
}
