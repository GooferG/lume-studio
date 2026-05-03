import './globals.css';

export const metadata = {
  title: 'Lume Studio',
  description: 'Modern websites for small businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
