// intellipath/app/industry-insights/page.tsx
import React from "react";

export default function IndustryInsightsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-4">
      <section className="bg-card shadow-lg rounded-xl p-8 w-full max-w-3xl mt-12">
        <h1 className="text-4xl font-extrabold mb-2 text-center">Industry Insights</h1>
        <div className="border-b border-muted mb-6"></div>
        <p className="text-lg text-muted-foreground text-center">
          Welcome to the Industry Insights page! Here you can find the latest trends, news, and analysis for various industries.
        </p>
        {/* Add more content or components here */}
      </section>
    </main>
  );
}