/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { BankModel } from './Nearby';
// Single Place Card component
const PlaceCard = ({ place }: { place: BankModel }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/place?id=${place.id}`)
  }
  
  return (
    <Card onClick={handleCardClick} sx={{ height: "80px", display: 'flex', color:"#212121", padding: "0px 10px 0px 10px", marginBottom: 2, backgroundColor: "#fafafa", borderRadius: "20px" }}>
      <CardMedia
        component="img"
        sx={{ width: 50, height: 50, margin: 1 }}
        image={place.icon}
        alt={place.tags.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
        <CardContent>
          <Typography sx={{
            fontSize: 16,
            fontWeight: 'bold',
            wordBreak: 'no-break',
          }}>{place.tags.name}</Typography>
          <Typography variant="caption">{place.distance} km</Typography>
        </CardContent>
      </Box>
      <ArrowForwardIosIcon sx={{ alignSelf: 'center' }} />
    </Card>
  )
}

PlaceCard.displayName = 'PlaceCard';
export default PlaceCard;