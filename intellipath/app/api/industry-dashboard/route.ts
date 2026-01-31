import { NextResponse } from "next/server";

// Mocked real-time data. Replace with real API integration as needed.
export async function GET() {
  // In a real scenario, fetch from external APIs here
  const dashboardData = {
    lastUpdated: new Date().toISOString(),
    marketOutlook: "POSITIVE",
    growth: 12.0,
    demandLevel: "HIGH",
    topSkills: ["Python", "Java", "JavaScript", "Cloud Computing", "Agile"],
    salaryRanges: [
      { role: "Data Scientist", min: 6, median: 12, max: 30 },
      { role: "Software Engineer", min: 4, median: 8, max: 20 },
      { role: "Cloud Architect", min: 10, median: 20, max: 40 },
      { role: "DevOps Engineer", min: 6, median: 12, max: 25 },
      { role: "Product Manager", min: 8, median: 18, max: 35 },
      { role: "Frontend Developer", min: 4, median: 8, max: 18 },
      { role: "Backend Developer", min: 4, median: 9, max: 22 },
      { role: "AI/ML Engineer", min: 8, median: 16, max: 35 },
      { role: "UX Designer", min: 4, median: 7, max: 15 },
      { role: "QA Engineer", min: 3, median: 6, max: 14 },
      { role: "Business Analyst", min: 4, median: 8, max: 18 },
      { role: "Cybersecurity Analyst", min: 5, median: 10, max: 22 },
      { role: "Database Administrator", min: 5, median: 10, max: 20 },
      { role: "Network Engineer", min: 4, median: 8, max: 16 },
      { role: "Mobile Developer", min: 4, median: 8, max: 18 },
      { role: "Cloud Consultant", min: 8, median: 18, max: 32 },
      { role: "IT Support Specialist", min: 2.5, median: 4, max: 8 },
      { role: "Systems Engineer", min: 4, median: 8, max: 18 },
      { role: "Solutions Architect", min: 12, median: 22, max: 45 },
      { role: "Scrum Master", min: 5, median: 10, max: 20 },
      { role: "Marketing Manager", min: 4, median: 9, max: 18 },
      { role: "Sales Executive", min: 3, median: 7, max: 20 },
      { role: "HR Manager", min: 4, median: 8, max: 16 },
      { role: "Operations Manager", min: 5, median: 10, max: 20 },
      { role: "Financial Analyst", min: 4, median: 8, max: 18 },
      { role: "Legal Counsel", min: 8, median: 18, max: 40 },
      { role: "Content Strategist", min: 3, median: 6, max: 12 },
      { role: "SEO Specialist", min: 3, median: 5, max: 10 },
      { role: "Graphic Designer", min: 2.5, median: 5, max: 10 },
      { role: "Project Coordinator", min: 3, median: 5, max: 10 },
    ],
  };
  return NextResponse.json(dashboardData);
}
