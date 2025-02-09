import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";

interface TransactionTypeBadgeProps {
  transactions: Transaction;
}

const TransactionTypeBadge = ({ transactions }: TransactionTypeBadgeProps) => {
  switch (transactions.type) {
    case TransactionType.EXPENSE:
      return (
        <Badge className="bg-muted font-bold text-danger hover:bg-muted">
          <CircleIcon className="mr-2 fill-danger" size={10} />
          Despesa
        </Badge>
      );
    case TransactionType.INVESTIMENT:
      return (
        <Badge className="bg-muted font-bold text-white hover:bg-slate-800">
          <CircleIcon className="mr-2 fill-white" size={10} />
          Investimento
        </Badge>
      );
    default:
      return (
        <Badge className="bg-muted font-bold text-primary hover:bg-muted">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Depósito
        </Badge>
      );
  }
};

export default TransactionTypeBadge;
