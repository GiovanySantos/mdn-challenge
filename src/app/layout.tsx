import '../styles/globals.css';

export const metadata = {
  title: 'MDN Challenge',
  description: 'My digital nomads frontend challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
