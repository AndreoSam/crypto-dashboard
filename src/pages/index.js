import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <SignedOut>
        <Typography variant="h3" gutterBottom>
          Crypto Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Sign in to track and analyze cryptocurrencies in real-time.
        </Typography>
        <SignInButton mode="modal">
          <Button variant="contained" size="large">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <UserButton />
          <Typography variant="body1">Redirecting to dashboard...</Typography>
        </Box>
      </SignedIn>
    </Container>
  );
}
