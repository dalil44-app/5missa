export const metadata = {
  title: 'موقع خميسة',
  description: 'مشروع خميسة الجديد على Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body style={{ margin: 0, backgroundColor: '#fafafa' }}>{children}</body>
    </html>
  );
}
