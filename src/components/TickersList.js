import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function TickersList({ tickers }) {
  const topTickers = tickers.slice(0, 10); // limit to 10 for brevity

  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exchange</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>Volume (24h)</TableCell>
            <TableCell>Trust Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTickers.map((ticker, index) => (
            <TableRow key={index}>
              <TableCell>{ticker.market.name}</TableCell>
              <TableCell>
                {ticker.base}/{ticker.target}
              </TableCell>
              <TableCell>
                ${ticker.converted_last.usd?.toLocaleString() || "N/A"}
              </TableCell>
              <TableCell>
                ${ticker.converted_volume.usd?.toLocaleString() || "N/A"}
              </TableCell>
              <TableCell>{ticker.trust_score || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
