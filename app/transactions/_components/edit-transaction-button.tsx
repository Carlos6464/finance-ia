"use client";

import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transactions: Transaction;
}

const EditTransactionButton = ({
  transactions,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transactions,
          amount: Number(transactions.amount),
        }}
        transactionId={transactions.id}
      />
    </>
  );
};

export default EditTransactionButton;
