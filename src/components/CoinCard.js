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
  const router = useRouter();const formatMarketCap = (value) => {
    if (!value) return "$0";

    const num = Number(value);
    if (num >= 1_000_000_000_000) {
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString("en-US")}`;
  };
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width:"250px"
      }}
    >
      <CardActionArea onClick={() => router.push(`/coin/${data.id}`)}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar src={data.image} alt={data.name} />
            <Box>
              <Typography variant="h6">
                {data.name.length > 10
                  ? `${data.name.slice(0, 10)}...`
                  : data.name}
              </Typography>
              <Typography variant="body2">
                {data.symbol.toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1">
            Price: ${data.current_price.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Market Cap: {formatMarketCap(data.market_cap)}
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
