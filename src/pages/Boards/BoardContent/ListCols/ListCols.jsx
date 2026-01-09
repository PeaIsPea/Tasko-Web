
import Box from '@mui/material/Box'
import Col from './Col/Col'
import { Button } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

function ListCols() {
  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': {
        m: 2
      }
    }}>

      <Col />
      <Col />
      <Col />

      {/* Button Add new col*/}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3c'
      }}>
        <Button 
          startIcon={<AddToPhotosIcon />}
          sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
        >Add new column</Button>
      </Box>

    </Box>
  )
}

export default ListCols