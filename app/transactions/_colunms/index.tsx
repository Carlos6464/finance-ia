"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import TransactionTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: Transactions } }) => (
      <TransactionTypeBadge transactions={Transactions} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: Transactions } }) =>
      TRANSACTION_CATEGORY_LABELS[Transactions.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: Transactions } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[Transactions.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: Transactions } }) =>
      new Date(Transactions.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: Transactions } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(Transactions.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: Transactions } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transactions={Transactions} />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
