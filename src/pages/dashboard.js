import { SignOutButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CoinCard from "@/components/CoinCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const data_per_age = 12;

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

const fetchSearchedData = async (search) => {
  if (!search) return null;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/search?query=${search}`
  );
  return data.coins;
};

const dashboard = ({ darkMode, setDarkMode }) => {
  const [search, setSearch] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchData,
  });
  //   console.log(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchSearchedData(search).then((results) => {
          setSearchResults(results);
          setCurrentpage(1);
        });
      } else {
        setSearchResults(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const displayData = useMemo(() => {
    if (searchResults) {
      return searchResults.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        current_price: coin.market_cap_rank,
        price_change_percentage_24h: null,
        image: coin.large,
      }));
    }
    return data || [];
  }, [data, searchResults]);

  const filteredData = useMemo(() => {
    if (searchResults) return searchResults;
    return displayData.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [displayData, search, searchResults]);

  const totalPages = Math.ceil(filteredData.length / data_per_age);
  const pageData = useMemo(() => {
    const startIndex = (currentpage - 1) * data_per_age;
    return filteredData.slice(startIndex, startIndex + data_per_age);
  }, [filteredData, currentpage]);

  const handlePageChange = (event, page) => {
    setCurrentpage(page);
  };

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
        <Box>
          <Typography variant="h5" gutterBottom>Cryptocurrencies</Typography>
        </Box>

        {isLoading ? (
          <Container sx={{ mt: 4, textAlign: "center" }}>
            <CircularProgress />
          </Container>
        ) : isError ? (
          <Typography color="error">Error to load data!</Typography>
        ) : (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {pageData.map((prod) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={prod.id}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <CoinCard data={prod} />
                  </Box>
                </Grid>
              ))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentpage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default dashboard;
