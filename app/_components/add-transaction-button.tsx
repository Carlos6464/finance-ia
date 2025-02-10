"use client";

import { ArrowDownUp } from "lucide-react";
import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { useState } from "react";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button className="rounded-full" onClick={() => setDialogIsOpen(true)}>
        Adicionar transação <ArrowDownUp />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
