import { Card as MuiCard } from '@mui/material'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'

function Card({ card }) {
  const shouldShowCardActions = () => (
    !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  )

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      {card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
        />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>

      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button size="small" startIcon={<GroupIcon />}>
            {card?.memberIds?.length || 0}
          </Button>
          <Button size="small" startIcon={<CommentIcon />}>
            {card?.comments?.length || 0}
          </Button>
          <Button size="small" startIcon={<AttachmentIcon />}>
            {card?.attachments?.length || 0}
          </Button>
        </CardActions>
      }

    </MuiCard>
  )
}

export default Card