type TransactionCardProps = {
  merchant: string;
  category: string;
  amount: number;
  iconEmoji?: string;
};

export default function TransactionCard({
  merchant,
  category,
  amount,
  iconEmoji,
}: TransactionCardProps) {
  const isNegative = amount < 0;
  const amountColor = isNegative ? "text-red-400" : "text-emerald-400";
  const formatted = `${isNegative ? "-" : "+"}$${Math.abs(amount).toFixed(2)}`;

  return (
    <div
      className="flex items-center justify-between rounded-2xl bg-[#121826] px-5 py-4 font-sans shadow-sm ring-1 ring-white/5"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="flex items-center gap-4">
        {iconEmoji ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-xl">
            <span aria-hidden>{iconEmoji}</span>
          </div>
        ) : null}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-white">{merchant}</span>
          <span className="text-sm text-white/50">{category}</span>
        </div>
      </div>
      <div className={`text-base font-semibold ${amountColor}`}>{formatted}</div>
    </div>
  );
}
