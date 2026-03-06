import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntelliPath – AI Career Guidance Platform",
  description:
    "IntelliPath is an AI-powered career guidance platform that helps students and professionals discover the right career path through personalized assessments, skill analysis, and data-driven recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        
        <ClerkProvider appearance={{ baseTheme: dark }}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main className="min-h-screen">
              {children}
            </main>

            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="w-full text-center text-gray-200">
                <p>Made with ❤️ by DJNK Team</p>
              </div>
            </footer>

          </ThemeProvider>

        </ClerkProvider>

      </body>
    </html>
  );
}