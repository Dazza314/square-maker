import { forwardRef, PropsWithChildren } from "react";

export const Dialog = forwardRef<HTMLDialogElement, PropsWithChildren>(
  function Dialog({ children }, ref) {
    return <dialog ref={ref}>{children}</dialog>;
  },
);

function useDialog(
  ref: HTMLDialogElement | null,
): [open: () => void, close: () => void] {
  function open() {
    ref?.showModal();
  }

  function close() {
    ref?.close();
  }

  return [open, close];
}

export default useDialog;
