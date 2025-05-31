import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import PriceChart from "@/components/PriceChart";
import OHLCChart from "@/components/OHLCChart";
import TickersList from "@/components/TickersList";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
  headers: { accept: "application/json" },
  timeout: 10000, // 10 second timeout
});

const fetchDetails = async (id) => {
  try {
    const [infoRes, historyRes, ohlcRes, tickersRes] = await Promise.all([
      api.get(`/${id}`),
      api.get(`/${id}/market_chart`, {
        params: { vs_currency: "usd", days: 7 },
      }),
      api.get(`/${id}/ohlc`, {
        params: { vs_currency: "usd", days: 7 },
      }),
      api.get(`/${id}/tickers`),
    ]);

    return {
      info: infoRes.data,
      chart: historyRes.data,
      ohlc: ohlcRes.data,
      tickers: tickersRes.data.tickers || [], 
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch coin details");
  }
};

const IndividualPages = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchDetails(id),
    enabled: !!id,
    retry: 2, 
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">
          {error?.message || "Failed to load details!"}
        </Typography>
      </Container>
    );
  }

  const { info, chart, ohlc, tickers } = data;
  // console.log("ohlc Details:", ohlc);
  

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={info.image?.large}
          alt={info.name}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography variant="h6">{info.name}</Typography>
          <Typography variant="body2">{info.symbol?.toUpperCase()}</Typography>
        </Box>
      </Box>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={3}>
          <Typography>
            💵 Current Price: $
            {info.market_data.current_price.usd.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography>
            📈 Market Cap: ${info.market_data.market_cap.usd.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography>
            🔁 Circulating Supply:{" "}
            {info.market_data.circulating_supply.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography>
            💰 Total Supply:{" "}
            {info.market_data.total_supply?.toLocaleString() || "N/A"}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">📉 7-Day Price Chart</Typography>
      <PriceChart data={chart.prices} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🕰️ OHLC Chart</Typography>
      <OHLCChart data={ohlc} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">🏦 Tickers</Typography>
      <TickersList tickers={tickers} />
    </Container>
  );
};

export default IndividualPages;
