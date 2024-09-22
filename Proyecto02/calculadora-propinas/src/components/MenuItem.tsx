import React from 'react'
import type { MenuItem } from '../types'

type MenuItemProp={
    item:MenuItem
}

const MenuItem = ({item}:MenuItemProp) => {
  return (
    <div>
        Hola
    </div>
  )
}

export default MenuItem
