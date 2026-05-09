'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, History, Library, Search } from 'lucide-react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

type QuickAction = {
  icon: React.ElementType
  title: string
  description: string
}

type Activity = {
  icon: React.ReactNode
  title: string
  category: string
  time: string
  amount: number
}

type Service = {
  icon: React.ElementType
  title: string
  description: string
  isPremium?: boolean
  hasAction?: boolean
}

interface FinancialDashboardProps {
  quickActions: QuickAction[]
  recentActivity: Activity[]
  financialServices: Service[]
}

const IconWrapper = ({
  icon: Icon,
  className,
}: {
  icon: React.ElementType
  className?: string
}) => (
  <div className={cn('p-2 rounded-full flex items-center justify-center', className)}>
    <Icon className="w-5 h-5" />
  </div>
)

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function FinancialDashboard({
  quickActions,
  recentActivity,
  financialServices,
}: FinancialDashboardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#16181a] text-white rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] max-w-2xl mx-auto"
    >
      <div className="p-5 md:p-6">
        {/* Search */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search transactions, payments, or type a command…"
            className="bg-[#0a0a0a] w-full border border-white/10 rounded-lg pl-10 pr-14 py-2.5 text-sm text-white/90 placeholder:text-white/30 focus:ring-2 focus:ring-[#494fdf]/40 focus:border-[#494fdf]/60 outline-none transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center justify-center text-[10px] font-mono text-white/50 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.04)' }}
              className="group text-center p-3 rounded-xl cursor-pointer transition-colors"
            >
              <IconWrapper
                icon={action.icon}
                className="mx-auto mb-2 bg-[#494fdf]/15 text-[#a8aef5] group-hover:bg-[#494fdf]/25"
              />
              <p className="text-sm font-medium text-white">{action.title}</p>
              <p className="text-[11px] text-white/40">{action.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-white/50" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Recent activity
            </h2>
          </div>
          <motion.ul variants={containerVariants} className="space-y-2">
            {recentActivity.map((activity, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="flex items-center justify-between p-2.5 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {React.isValidElement(activity.icon) ? (
                    activity.icon
                  ) : (
                    <IconWrapper
                      icon={activity.icon as React.ElementType}
                      className="bg-white/5 text-white/70"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-white truncate">{activity.title}</p>
                    <p className="text-[11px] text-white/40">
                      {activity.category} · {activity.time}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    'text-sm font-mono px-2 py-1 rounded-md flex-shrink-0',
                    activity.amount > 0
                      ? 'text-[#00a87e] bg-[#00a87e]/10'
                      : 'text-[#f87a90] bg-[#e61e49]/10',
                  )}
                >
                  {activity.amount > 0 ? '+' : '-'}${Math.abs(activity.amount).toFixed(2)}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Financial services — only renders if there are items to show */}
        {financialServices.length > 0 && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <Library className="w-4 h-4 text-white/50" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Financial services
            </h2>
          </div>
          <motion.div variants={containerVariants} className="space-y-1.5">
            {financialServices.map((service, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <IconWrapper icon={service.icon} className="bg-white/5 text-white/70" />
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2 text-white">
                      {service.title}
                      {service.isPremium && (
                        <span className="text-[10px] font-semibold text-[#a8aef5] bg-[#494fdf]/15 ring-1 ring-[#494fdf]/30 px-1.5 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-white/40">{service.description}</p>
                  </div>
                </div>
                {service.hasAction && <ChevronRight className="w-4 h-4 text-white/30" />}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        )}
      </div>
    </motion.div>
  )
}
