import Box from '@mui/material/Box'
import ListCols from './ListCols/ListCols'
import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#e74c3c'),
      width: '100%',
      height: (theme) => theme.taskoCustom.boardContentHeight,
      p: '5px 0'

    }}>
      <ListCols columns= {orderedColumns} />
    </Box>
  )
}

export default BoardContent