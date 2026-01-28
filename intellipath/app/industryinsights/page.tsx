"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function IndustryInsightsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/industry-news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (e: any) {
        setError(e.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
    // Optionally, refresh every 5 minutes:
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-4">
      <section className="bg-card shadow-lg rounded-xl p-8 w-full max-w-3xl mt-12 mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-center">Industry Insights</h1>
        <div className="border-b border-muted mb-6"></div>
        <p className="text-lg text-muted-foreground text-center">
          Welcome to the Industry Insights page! Here you can find the latest trends, news, and analysis for various industries.
        </p>
      </section>
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground">Loading news...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : news.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">No news found.</div>
        ) : (
          news.map((newsItem, idx) => (
            <Card key={idx} className="overflow-hidden flex flex-col">
              {newsItem.image && (
                <img src={newsItem.image} alt={newsItem.title} className="w-full h-48 object-cover" />
              )}
              <CardContent className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <h2 className="text-xl font-bold mb-2">{newsItem.title}</h2>
                  </a>
                  <p
                    className="text-muted-foreground mb-4"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxHeight: '6.5em', // ~4 lines for most fonts
                    }}
                  >
                    {newsItem.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span>{newsItem.source}</span>
                  <span>{newsItem.time}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}