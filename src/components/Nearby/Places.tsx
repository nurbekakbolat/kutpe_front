import PlaceCard from './PlaceCard'

import { Box } from '@mui/material'
import type { BankModel } from './Nearby'

interface PlacesProps {
  data: BankModel[];
}

const Places = ({ data }: PlacesProps) => {
  return (
    <Box height="100%" width="100%" overflow="auto" marginTop="50px">
      {data.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}
    </Box>
  )
}

Places.displayName = 'Places'
export default Places