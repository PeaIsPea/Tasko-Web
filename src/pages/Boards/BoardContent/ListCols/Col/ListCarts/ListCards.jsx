
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hiden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(${theme.taskoCustom.boardContentHeight} 
        - ${theme.spacing(5)} - ${theme.taskoCustom.colHeaderHeight} - ${theme.taskoCustom.colFooterHeight})`,
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#dcdde1'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {cards?.map(card => {
          return (
            <Card key={card?._id} card={card}/>
          )
        })}

      </Box>
    </SortableContext>
  )
}

export default ListCards