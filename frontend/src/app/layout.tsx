// app/layout.tsx
import './globals.css'; // optional, for global styles
import { ReactNode } from 'react';

export const metadata = {
  title: 'syncHer',
  description: 'AI chatbot for menstruation support',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
