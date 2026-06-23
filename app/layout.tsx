import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Volleyball Turniere – FBG Erlangen",
  description: "Regelmäßige Hallen- und Beach-Volleyball-Turniere der FBG Erlangen. Termine, Anmeldung, Teams und alle Infos auf einen Blick.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
