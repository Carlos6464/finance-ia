import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  balance: number;
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: SummaryCards) => {
  const cards = [
    {
      icon: <PiggyBankIcon size={16} />,
      title: "Investimento",
      amount: Number(investmentsTotal),
    },
    {
      icon: <TrendingUpIcon size={16} className="text-primary" />,
      title: "Receita",
      amount: Number(depositsTotal),
    },
    {
      icon: <TrendingDownIcon size={16} className="text-red-500" />,
      title: "Despesas",
      amount: Number(expensesTotal),
    },
  ];
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
