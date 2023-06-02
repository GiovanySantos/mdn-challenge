import '../styles/globals.css';

export const metadata = {
  title: 'CRUD Frontend example',
  description: 'CRUD for frontend challenge',
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
