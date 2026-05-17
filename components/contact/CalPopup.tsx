'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

type Props = {
  calUrl: string;
  triggerLabel?: string;
};

export function CalPopup({ calUrl, triggerLabel = 'Book a call' }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const open = () => {
    setMounted(true);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setMounted(false);
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      <Button onClick={open} aria-haspopup="dialog">
        {triggerLabel}
      </Button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-label="Book a discovery call"
        className="
          m-auto w-[min(92vw,900px)] h-[min(85vh,780px)] p-0 rounded-2xl
          border border-[var(--color-border)] bg-[var(--color-surface)]
          backdrop:bg-black/60 backdrop:backdrop-blur-sm
        "
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
          <span className="text-sm font-medium text-[var(--color-text)]">Book a call</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close booking dialog"
            className="
              h-8 w-8 inline-flex items-center justify-center rounded-full
              text-[var(--color-text-muted)] hover:text-[var(--color-text)]
              hover:bg-[var(--color-bg)] transition-colors
            "
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-[calc(100%-49px)] bg-[var(--color-bg)]">
          {mounted ? (
            <iframe
              src={calUrl}
              title="Book a discovery call"
              className="w-full h-full border-0"
              loading="lazy"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
