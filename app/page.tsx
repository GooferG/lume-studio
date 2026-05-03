import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold tracking-tight">Lume Studio</h1>
      <ThemeToggle />
    </main>
  );
}
