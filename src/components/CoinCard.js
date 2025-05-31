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
  const formatMarketCap = (value) => {
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
        width: "290px",
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
          <Typography
            variant="body1"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Price:</span>
            <span style={{ fontWeight: "bold" }}>
              ${data.current_price.toLocaleString()}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Market Cap:</span>
            <span style={{ fontWeight: "bold" }}>
              {formatMarketCap(data.market_cap)}
            </span>
          </Typography>

          <Typography
            variant="body2"
            sx={{ display: "flex", justifyContent: "space-between" }}
            color={data.price_change_percentage_24h >= 0 ? "green" : "error"}
          >
            <span>24h Change:</span>
            <span>{data.price_change_percentage_24h >= 0 ? "+" : ""}{data.price_change_percentage_24h.toFixed(2)}%</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CoinCard;
