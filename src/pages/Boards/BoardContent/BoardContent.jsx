import Box from '@mui/material/Box'
import ListCols from './ListCols/ListCols'
import { mapOrder } from '~/utils/sort'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Col from './ListCols/Col/Col'
import Card from './ListCols/Col/ListCarts/Card/Card'

import dropAnimation from '~/utils/animationdrop'

const ACTIVE_DRAG_ITEM_TYPE = {
  COL: 'ACTIVE_DRAG_ITEM_TYPE_COL',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const mysensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDragItemId, setactiveDragItemId] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColDraggingCard, setOldColDraggingCard] = useState(null)


  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])

  const findColByCardId = (cardId) => {
    return orderedColumnsState.find(column => column.cards.map(card => card._id) ?.includes(cardId))
  }

  const moveCardBetweenDiffCols = (
    overCol,
    overCardId,
    active,
    over,
    activeCol,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    //be Updated State in the case of moving Card betwwen two diff cols
    setOrderedColumnsState( prevCols => {
      // Find position Card to drop
      const overCardIndex = overCol?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && 
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1: 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overCol.cards?.length + 1

      const nextCols = cloneDeep(prevCols)
      const nextActiveCol = nextCols.find(column => column._id === activeCol._id)
      const nextOverCol = nextCols.find(column => column._id === overCol._id)

      //old Col
      if (nextActiveCol) {
        //Delete Card in old Column
        nextActiveCol.cards = nextActiveCol.cards.filter(card => card._id !== activeDraggingCardId )

        //Update old Column
        nextActiveCol.cardOrderIds = nextActiveCol.cards.map(card => card._id )
      }

      // new Col
      if (nextOverCol) {
        //Check Card isTrue in specify Column, If True -> Delete
        nextOverCol.cards = nextOverCol.cards.filter(card => card._id !== activeDraggingCardId )
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverCol._id
        }

        //Add to index
        nextOverCol.cards = nextOverCol.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        ////Update specify Column
        nextOverCol.cardOrderIds = nextOverCol.cards.map(card => card._id )
      }
      return nextCols
    })
  }
  const handleDragStart = (event) => {
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COL)
    setactiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColDraggingCard(findColByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COL) return

    const { active, over } = event

    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeCol = findColByCardId(activeDraggingCardId)
    const overCol = findColByCardId(overCardId)

    if (!activeCol || !overCol) return

    if (activeCol._id !== overCol._id) {
      moveCardBetweenDiffCols(
        overCol,
        overCardId,
        active,
        over,
        activeCol,
        activeDraggingCardId,
        activeDraggingCardData
      )

    }

  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeCol = findColByCardId(activeDraggingCardId)
      const overCol = findColByCardId(overCardId)

      if (!activeCol || !overCol) return

      if (oldColDraggingCard._id !== overCol._id) {
        moveCardBetweenDiffCols(
          overCol,
          overCardId,
          active,
          over,
          activeCol,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
      else {
        const oldCardIndex = oldColDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)

        const newCardIndex = overCol?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnsState( prevCols => {
          const nextCols = cloneDeep(prevCols)

          const targetCol = nextCols.find(col => col._id === overCol._id)
          targetCol.cards = dndOrderedCards
          targetCol.cardOrderIds = dndOrderedCards.map(card => card._id)


          return nextCols
        })

      }
    }

    // Drag and Drop Cols
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COL) {
      if (active.id !== over.id) {
        const oldColIndex = orderedColumnsState.findIndex(c => c._id === active.id)

        const newColIndex = orderedColumnsState.findIndex(c => c._id === over.id)

        const dndOrderedCols = arrayMove(orderedColumnsState, oldColIndex, newColIndex)

        // const dndOrderedColsIds = dndOrderedCols.map(c => c._id) sau nay lam backend
        setOrderedColumnsState(dndOrderedCols)
      }

    }
    //After drag and drop -> reset
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOldColDraggingCard(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={mysensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#e74c3c'),
        width: '100%',
        height: (theme) => theme.taskoCustom.boardContentHeight,
        p: '5px 0'

      }}>
        <ListCols columns= {orderedColumnsState} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COL)
          && <Col column={activeDragItemData} /> }

          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)
          && <Card card={activeDragItemData} /> }
        </DragOverlay>
      </Box>

    </DndContext>

  )
}

export default BoardContent