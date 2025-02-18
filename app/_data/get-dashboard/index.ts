import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

interface SummaryCards {
  month: string;
}

export const getDashboard = async ({ month }: SummaryCards) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          ...where,
          type: "DEPOSIT",
        },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          ...where,
          type: "EXPENSE",
        },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          ...where,
          type: "INVESTIMENT",
        },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.INVESTIMENT]:
      Math.round(
        (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
      ) ?? 0,
    [TransactionType.DEPOSIT]:
      Math.round(
        (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
      ) ?? 0,
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: {
      date: "desc",
    },
    take: 10,
  });

  return {
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
