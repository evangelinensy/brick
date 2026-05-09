import TransactionCard from "@/components/TransactionCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] px-6 py-10 text-white sm:px-10 md:py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight">Brick</h1>
          <p className="text-sm text-white/60">
            Watching your money. Finding you better deals.
          </p>
        </header>

        {/* Hero */}
        <section className="flex flex-col items-start gap-3">
          <span className="text-sm uppercase tracking-widest text-white/40">
            Saved this year
          </span>
          <h2 className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 bg-clip-text text-6xl font-extrabold leading-none text-transparent sm:text-7xl">
            $3,847
          </h2>
          <p className="text-lg text-white/70">saved this year</p>
        </section>

        {/* Transactions */}
        <section className="flex flex-col gap-3">
          <h3 className="mb-2 text-sm uppercase tracking-widest text-white/40">
            Recent activity
          </h3>
          <TransactionCard
            merchant="Whole Foods Market"
            category="Groceries"
            amount={-84.32}
            iconEmoji="🛒"
          />
          <TransactionCard
            merchant="Spotify"
            category="Subscriptions"
            amount={-10.99}
            iconEmoji="🎵"
          />
          <TransactionCard
            merchant="Direct Deposit"
            category="Income"
            amount={2500}
            iconEmoji="💰"
          />
        </section>

        {/* CTA */}
        <section className="flex justify-center">
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-[0.99]"
          >
            Find me better deals
          </button>
        </section>

        {/* Footer */}
        <footer className="pt-4 text-center text-sm text-white/50">
          1,247 users saving with Brick
        </footer>
      </div>
    </main>
  );
}
