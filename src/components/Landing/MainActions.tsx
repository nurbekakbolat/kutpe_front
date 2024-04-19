import { Box, Button, Typography  } from '@mui/material';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';

import { useNavigate } from 'react-router-dom';
const MainActions = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      margin: "0px",
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      rowGap: "20px",
    }}>
        <Button onClick={() => navigate("/nearby")} sx={{
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }} variant="contained" size="large" fullWidth>
         <Typography sx={{
            color: "#fff",
            marginRight: "10px"
         }}> Join queue</Typography> <QueuePlayNextIcon sx={{fontSize: "20px"}}/>
        </Button>
    </Box>
  );
};

export default MainActions;
