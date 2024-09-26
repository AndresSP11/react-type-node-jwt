
import type { MenuItem } from '../types'

type MenuItemProp={
    item:MenuItem
    addItem:(item:MenuItem)=>void
}

const MenuItem = ({item,addItem}:MenuItemProp) => {
  return (
    <button
    onClick={()=>addItem(item)}
    className=' rounded-lg w-full p-2 flex justify-between border-green-200 hover:bg-green-200 border-2'>
      <p>{item.name}</p>
      <p>${item.price}</p>
    </button>
  )
}

export default MenuItem
