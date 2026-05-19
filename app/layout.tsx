import "./globals.css";

export const metadata = {
  title: "ColdDM AI",
  description: "Generate personalized cold DMs using AI",
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