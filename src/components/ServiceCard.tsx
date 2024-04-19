import { Card, CardContent, Typography } from '@mui/material';

const ServiceCard = ({ title, description }: {title: string, description: string}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

ServiceCard.displayName = 'ServiceCard';
export default ServiceCard;
