"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SalaryBarChart from "@/components/SalaryBarChart";

export default function IndustryInsightsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<any>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboard() {
      setDashboardLoading(true);
      setDashboardError("");
      try {
        const res = await fetch("/api/industry-dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();
        setDashboard(data);
      } catch (e: any) {
        setDashboardError(e.message || "Error fetching dashboard data");
      } finally {
        setDashboardLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  // Fetch news data
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
      {/* Dashboard Section */}
      <section className="bg-card shadow-lg rounded-xl p-8 w-full max-w-5xl mt-12 mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-center">Industry Insights</h1>
        <div className="border-b border-muted mb-6"></div>
        <p className="text-lg text-muted-foreground text-center mb-6">
          Welcome to the Industry Insights page! Here you can find the latest trends, news, and analysis for various industries.
        </p>
        {dashboardLoading ? (
          <div className="text-center text-muted-foreground">Loading dashboard...</div>
        ) : dashboardError ? (
          <div className="text-center text-red-500">{dashboardError}</div>
        ) : dashboard ? (
          <div>
            <div className="flex flex-wrap justify-between gap-4 mb-6">
              <div className="bg-background rounded-lg p-4 flex-1 min-w-[180px]">
                <div className="text-xs text-muted-foreground mb-1">Market Outlook</div>
                <div className="text-2xl font-bold">{dashboard.marketOutlook}</div>
                <div className="text-xs text-muted-foreground mt-1">Last updated: {new Date(dashboard.lastUpdated).toLocaleDateString()}</div>
              </div>
              <div className="bg-background rounded-lg p-4 flex-1 min-w-[180px]">
                <div className="text-xs text-muted-foreground mb-1">Industry Growth</div>
                <div className="text-2xl font-bold">{dashboard.growth}%</div>
              </div>
              <div className="bg-background rounded-lg p-4 flex-1 min-w-[180px]">
                <div className="text-xs text-muted-foreground mb-1">Demand Level</div>
                <div className="text-2xl font-bold text-green-500">{dashboard.demandLevel}</div>
              </div>
              <div className="bg-background rounded-lg p-4 flex-1 min-w-[180px]">
                <div className="text-xs text-muted-foreground mb-1">Top Skills</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dashboard.topSkills.map((skill: string) => (
                    <span key={skill} className="bg-muted px-2 py-1 rounded text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Salary Ranges by Role</h3>
              <p className="text-xs text-muted-foreground mb-2">Displaying minimum, median, and maximum salaries </p>
              <SalaryBarChart data={dashboard.salaryRanges} />
            </div>
          </div>
        ) : null}
      </section>
      {/* News Section */}
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
                      maxHeight: '6.5em',
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