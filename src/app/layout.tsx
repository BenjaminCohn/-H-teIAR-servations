import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Hôte IA Réservations Restaurant 24/7",
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
      <body>
        {children}

        {/* RelevanceAI chat bubble (affiché sur toutes les pages) */}
        <Script
          src="https://app.relevanceai.com/embed/chat-bubble.js"
          strategy="afterInteractive"
          data-relevanceai-share-id="d7b62b/a3b5a990-0128-454e-994b-ffe5083772a2/ba5337db-a9dc-4550-9ea3-e4296fb7d479"
          data-share-styles="hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false"
        />
      </body>
    </html>
  );
}
