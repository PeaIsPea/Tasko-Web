import Box from '@mui/material/Box'
import ListCols from './ListCols/ListCols'
import { mapOrder } from '~/utils/sort'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useEffect, useState } from 'react'

function BoardContent({ board }) {

  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const mysensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)

      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)

      const dndOrderedCols = arrayMove(orderedColumnsState, oldIndex, newIndex)

      // const dndOrderedColsIds = dndOrderedCols.map(c => c._id) sau nay lam backend
      setOrderedColumnsState(dndOrderedCols)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mysensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#e74c3c'),
        width: '100%',
        height: (theme) => theme.taskoCustom.boardContentHeight,
        p: '5px 0'

      }}>
        <ListCols columns= {orderedColumnsState} />
      </Box>

    </DndContext>

  )
}

export default BoardContent