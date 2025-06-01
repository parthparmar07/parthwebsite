import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Parth Parmar - AI & ML Engineer | Portfolio",
  description:
    "Portfolio of Parth Parmar, B.Tech Computer Science student specializing in AI & ML at Atlas Skilltech University. Explore innovative projects, internships, and technical expertise.",
  keywords: "Parth Parmar, AI, Machine Learning, Computer Science, Portfolio, Full Stack Developer, Data Science",
  authors: [{ name: "Parth Parmar" }],
  openGraph: {
    title: "Parth Parmar - AI & ML Engineer",
    description: "Innovative AI & ML solutions by Parth Parmar",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
