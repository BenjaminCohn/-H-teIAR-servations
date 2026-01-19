import "./globals.css";

export const metadata = {
  title: "Hôte IA – Réservations Restaurant 24/7",
  description:
    "Agent IA de réservation pour restaurants : prend les demandes, confirme, et enregistre automatiquement dans le planning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
