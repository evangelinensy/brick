# Brick

> The AI that watches your money. Finding you better deals.

Brick is a personal finance app — connect your bank, watch your spending, get proactive deal recommendations. Like Rocket Money meets Monarch, but with an agent that actually does the work.

1,247 users · $3,847 average yearly savings.

---

## This repo is the demo codebase for [BuildFeed](https://github.com/evangelinensy/buildfeed)

BuildFeed is "the news feed that ships your code." It reads news, picks the right specialist agent (code · design · marketing · strategy), and ships a real action against this codebase.

When BuildFeed connects to Brick, the agents:

- 🔧 **Code agent** edits `lib/integrations/plaid.ts` when Plaid ships new APIs
- 💌 **Marketing agent** drafts emails to Brick's customers in `lib/customers.ts` when rate news drops
- 🎨 **Design agent** regenerates `components/TransactionCard.tsx` when design trends shift
- 📋 **Strategy agent** writes response tickets when competitors ship features

Watch the agents at work in the [Pull Requests tab](https://github.com/evangelinensy/brick/pulls).

---

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Plaid SDK (transactions + enrichment)
- Revolut-inspired design system (see `DESIGN.md`)

## Run locally

```bash
pnpm install
pnpm dev
```

Built for AI Engineer Singapore Hackathon · May 2026
