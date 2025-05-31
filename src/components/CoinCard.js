import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const CoinCard = ({ data }) => {
  // console.log(data);
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/coin/${data.id}`)}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar src={data.image} alt={data.name} />
            <Box>
              <Typography variant="h6">{data.name}</Typography>
              <Typography variant="body2">
                {data.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">
            Price: ${data.current_price.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Market Cap: ${data.market_cap.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color={data.price_change_percentage_24h >= 0 ? "green" : "error"}
          >
            24h Change: {data.price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CoinCard;
