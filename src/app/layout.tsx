import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SSL 2026 Overlay System',
  description: 'Real-time OBS overlay for SIJA Super League 2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
