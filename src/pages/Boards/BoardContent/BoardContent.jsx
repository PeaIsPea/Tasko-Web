import Box from '@mui/material/Box'
import ListCols from './ListCols/ListCols'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#e74c3c'),
      width: '100%',
      height: (theme) => theme.taskoCustom.boardContentHeight,
      p: '5px 0'

    }}>
      <ListCols />
    </Box>
  )
}

export default BoardContent