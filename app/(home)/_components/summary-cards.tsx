import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = (
    await db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        type: "DEPOSIT",
      },
    })
  )?._sum?.amount;

  const expensesTotal = (
    await db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        type: "EXPENSE",
      },
    })
  )?._sum?.amount;

  const investmentsTotal = (
    await db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        type: "INVESTIMENT",
      },
    })
  )?._sum?.amount;

  const balance =
    Number(depositsTotal) - Number(expensesTotal) - Number(investmentsTotal);
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
