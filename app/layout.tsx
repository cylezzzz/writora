import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers'; // <- Das hinzufügen

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Writora – Bücher mit KI erstellen',
  description: 'Erstelle komplette Bücher mit KI – von der Idee bis zur KDP-Datei. Kostenlos starten.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>  {/* <- Das hinzufügen */}
          {children}
        </Providers>   {/* <- Das hinzufügen */}
      </body>
    </html>
  );
}