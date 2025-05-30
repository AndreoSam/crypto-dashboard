import { SignOutButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/CoinCard";

const fetchData = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        price_change_percentage: "24h",
      },
    }
  );
  return data;
};

const dashboard = ({ darkMode, setDarkMode }) => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchData,
  });
//   console.log(data);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>Crypto Dashboard</Typography>
          <Box display="flex" alignItems="center">
            <Typography>Dark Mode</Typography>
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <SignOutButton>
              <IconButton color="inherit">
                <LogoutIcon />
              </IconButton>
            </SignOutButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          <TextField
            label="Search for a coin"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isError ? (
          <Typography color="error">Error to load data!</Typography>
        ) : (
          <Grid container spacing={2}>
            {data.map((prod)=>(
              <Grid item xs={12} sm={6} md={4} lg={3} key={prod.id}>
                <CoinCard data={prod}/>
                </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default dashboard;
