This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🪙 Crypto Dashboard

A responsive, authentication-protected cryptocurrency dashboard built with **Next.js**, **Material UI**, **TanStack Query**, and **Clerk.dev**. It uses **CoinGecko API** for real-time crypto data and **Chart.js** for visualizing price trends.

---

## 📋 Project Overview

**Features:**
- 🔐 User Authentication with Clerk.dev (Sign-up, Sign-in, Sign-out)
- 📊 Dashboard page with:
  - Searchable, paginated list of top cryptocurrencies
  - Name, symbol, market cap, current price, 24h price change
  - Dark mode support
- 📈 Coin Details Page:
  - Detailed info including logo, description, market data, supply info
  - 7-day line chart of price history
  - Exchange tickers
  - OHLC chart (last 1 or 7 days)
- ⚡ Responsive design with Material UI
- 🚀 Client-side caching and auto-refetching via TanStack Query

Live Link: crypto-dashboard-git-main-andreo-samadders-projects.vercel.app
---

## 🛠️ Local Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/AndreoSam/crypto-dashboard.git
cd crypto-dashboard
