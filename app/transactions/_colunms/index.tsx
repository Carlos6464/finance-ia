"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import TransactionTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Lazer",
  FOOD: "Alimentação",
  HOUSING: "Moradia",
  HEALTH: "Saúde",
  OTHER: "Outros",
  UTILITY: "Utilidades",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_SLIP: "Boleto bancário",
  BANK_TRANSFER: "Transferência bancária",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de debito",
  PIX: "PIX",
  OTHER: "Outros",
};

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
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
