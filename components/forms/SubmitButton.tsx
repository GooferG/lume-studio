'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/Button';

export function SubmitButton({ idleLabel = 'Submit' }: { idleLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending…' : idleLabel}
    </Button>
  );
}
