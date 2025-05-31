import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...pageProps}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component
            {...pageProps}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
