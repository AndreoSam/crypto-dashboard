import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/router";

export default function CoinCard({ coin }) {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/coin/${coin.id}`)}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Avatar src={coin.image} alt={coin.name} />
            <Box>
              <Typography variant="h6">{coin.name}</Typography>
              <Typography variant="body2">
                {coin.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">
            💵 ${coin.current_price.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            💼 Market Cap: ${coin.market_cap.toLocaleString()}
          </Typography>
          <Typography
            variant="body2"
            color={coin.price_change_percentage_24h >= 0 ? "green" : "error"}
          >
            📈 24h: {coin.price_change_percentage_24h.toFixed(2)}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
