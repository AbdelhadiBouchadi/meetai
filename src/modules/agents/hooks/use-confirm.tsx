import ResponsiveDialog from "@/components/shared/responsive-dialog";
import { Button } from "@/components/ui/button";
import React, { JSX, useState } from "react";

export const UseConfirm = (
  title: string,
  description: string,
  confirmVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => setPromise({ resolve }));
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 px-4 lg:flex-row">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          className="w-full lg:w-auto"
        >
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};
