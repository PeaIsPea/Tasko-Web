
import Box from '@mui/material/Box'
import Col from './Col/Col'
import { Button } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListCols({ columns }) {
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => {
          return (
            <Col key={column?._id} column={column} />
          )
        })}

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
    </SortableContext>
  )
}

export default ListCols