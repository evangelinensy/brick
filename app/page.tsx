'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeftRight,
  CreditCard,
  Landmark,
  ShieldCheck,
  SwitchCamera,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { FinancialDashboard } from '@/components/ui/financial-dashboard'

const MerchantBadge = ({ letter, bg }: { letter: string; bg: string }) => (
  <div
    className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-white text-sm flex-shrink-0 ${bg}`}
    aria-hidden
  >
    {letter}
  </div>
)

const quickActions = [
  { icon: ArrowLeftRight, title: 'Transfer', description: 'Send money' },
  { icon: Landmark, title: 'Pay', description: 'Bills & payments' },
  { icon: TrendingUp, title: 'Invest', description: 'Grow wealth' },
  { icon: CreditCard, title: 'Cards', description: 'Manage cards' },
]

// Raw merchant strings — what Plaid actually returns before enrichment.
// The two Starbucks transactions look like different merchants here, which is
// the visible problem the code agent's PR fixes (delete the regex, switch on
// Plaid's Smart Categorize API).
const recentActivity = [
  {
    icon: <MerchantBadge letter="W" bg="bg-[#00a87e]" />,
    title: 'WFM #00482',
    category: 'Groceries',
    time: '2 hours ago',
    amount: -84.32,
  },
  {
    icon: <MerchantBadge letter="N" bg="bg-[#e61e49]" />,
    title: 'NETFLIX.COM',
    category: 'Subscription',
    time: '1 day ago',
    amount: -15.49,
  },
  {
    icon: <MerchantBadge letter="S" bg="bg-[#3a40c4]" />,
    title: 'SBUX-8821 STARBUCKS',
    category: 'Coffee',
    time: '2 days ago',
    amount: -5.75,
  },
  {
    icon: <MerchantBadge letter="S" bg="bg-[#3a40c4]" />,
    title: 'STARBUCKS #6677',
    category: 'Coffee',
    time: '3 days ago',
    amount: -6.5,
  },
]

const financialServices = [
  {
    icon: ShieldCheck,
    title: 'Wealth Management',
    description: 'Investment portfolios & advisory',
    isPremium: true,
  },
  {
    icon: Target,
    title: 'Savings Goals',
    description: 'Set & track financial goals',
    hasAction: true,
  },
  {
    icon: SwitchCamera,
    title: 'Cash Flow',
    description: 'Income & expense analysis',
  },
  {
    icon: Users,
    title: 'Joint Accounts',
    description: 'Family & business accounts',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14 space-y-8">
        {/* Brand header — centered: logo + divider + tagline */}
        <header className="flex items-center justify-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-[#a8aef5] via-[#4f55f1] to-[#494fdf] bg-clip-text text-transparent">
              Brick
            </span>
          </h1>
          <span className="h-5 w-px bg-white/15" aria-hidden />
          <p className="text-sm text-white/55 leading-tight">
            AI that finds you best deals &amp; cards &amp; subscriptions
          </p>
        </header>

        {/* Hero stat */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Saved this year
          </p>
          <p className="text-7xl md:text-8xl font-semibold leading-none tracking-tight">
            <span className="bg-gradient-to-b from-white via-white to-neutral-400/70 bg-clip-text text-transparent">
              $3,847
            </span>
          </p>
          <p className="text-xs text-white/40">
            +<span className="text-[#00a87e]">$412</span> this month vs your average
          </p>
        </motion.section>

        {/* Dashboard */}
        <FinancialDashboard
          quickActions={quickActions}
          recentActivity={recentActivity}
          financialServices={[]}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <button
            type="button"
            className="w-full py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#494fdf] via-[#4f55f1] to-[#3a40c4] shadow-[0_8px_24px_rgba(73,79,223,0.45)] hover:brightness-110 transition"
          >
            Find me better deals →
          </button>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-xs text-white/40 pt-2">
          1,247 users saving with{' '}
          <span className="text-white/60 font-medium">Brick</span>
        </footer>
      </div>
    </main>
  )
}
