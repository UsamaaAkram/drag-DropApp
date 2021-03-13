import React, { useState, useRef } from 'react'

export default function DragDrop({ data }) {
  const [list, setList] = useState(data)
  const [dragging, setDragging] = useState(false)
  const dragItem = useRef()
  const dragNode = useRef()

  const handleDragStart = (e, params) => {
    dragItem.current = params
    dragNode.current = e.target
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0);
  }

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current
    if (e.target !== dragNode.current) {
      setList(oldlist => {
        let newList = JSON.parse(JSON.stringify(oldlist))
        newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    setDragging(false)
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }



  function getStyle(params) {
    const currentItem = dragItem.current
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
      return 'current dnd-item'
    }
    return 'dnd-item'
  }

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          onDragEnter={dragging && !grp.items.length ? (e) => { handleDragEnter(e, { grpI, itemI: 0 }) } : null}
          className="dnd-group"
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
              onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
              key={item}
              className={dragging ? getStyle({ grpI, itemI }) : "dnd-item"}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
