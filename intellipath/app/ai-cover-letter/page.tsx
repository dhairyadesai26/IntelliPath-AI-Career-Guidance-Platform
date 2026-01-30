
'use client';
import React, { useState } from "react";

export default function CoverLetterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    company: "",
    skills: "",
    experience: "",
    achievements: "",
    whyCompany: "",
    message: "",
  });
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate AI generation (replace with API call if needed)
    setTimeout(() => {
      setGenerated(
        `Dear Hiring Manager,\n\n` +
        `I am writing to express my keen interest in the position of ${form.jobTitle} at ${form.company}. ` +
        `With a background in ${form.experience || "relevant experience"}, and proven skills in ${form.skills}, I am confident in my ability to contribute effectively to your team.\n\n` +
        (form.achievements ? `Some of my notable achievements include: ${form.achievements}.\n\n` : "") +
        (form.whyCompany ? `I am particularly drawn to ${form.company} because ${form.whyCompany}.\n\n` : "") +
        (form.message ? `${form.message}\n\n` : "") +
        `I would welcome the opportunity to discuss how my background, skills, and certifications can be beneficial to your organization. Please find my contact details below.\n\n` +
        `Email: ${form.email || "[your.email@email.com]"}\nPhone: ${form.phone || "[your phone number]"}\n\n` +
        `Thank you for considering my application.\n\nSincerely,\n${form.name}`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-background px-4 py-12">
      <section className="bg-card shadow-lg rounded-xl p-8 w-full max-w-2xl mt-8 mb-8">
        <h1 className="text-3xl font-extrabold mb-2 text-center">AI Cover Letter Generator</h1>
        <div className="border-b border-muted mb-6"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              className="flex-1 border border-muted rounded px-3 py-2 bg-background"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="flex-1 border border-muted rounded px-3 py-2 bg-background"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              className="flex-1 border border-muted rounded px-3 py-2 bg-background"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              type="tel"
            />
            <input
              className="flex-1 border border-muted rounded px-3 py-2 bg-background"
              name="jobTitle"
              placeholder="Job Title"
              value={form.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="w-full border border-muted rounded px-3 py-2 bg-background"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-muted rounded px-3 py-2 bg-background"
            name="skills"
            placeholder="Key Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-muted rounded px-3 py-2 bg-background"
            name="experience"
            placeholder="Relevant Experience (e.g. 3 years in software development)"
            value={form.experience}
            onChange={handleChange}
          />
          <input
            className="w-full border border-muted rounded px-3 py-2 bg-background"
            name="achievements"
            placeholder="Key Achievements (optional)"
            value={form.achievements}
            onChange={handleChange}
          />
          <input
            className="w-full border border-muted rounded px-3 py-2 bg-background"
            name="whyCompany"
            placeholder="Why this company? (optional)"
            value={form.whyCompany}
            onChange={handleChange}
          />
          <textarea
            className="w-full border border-muted rounded px-3 py-2 bg-background min-h-[80px]"
            name="message"
            placeholder="Add a custom message (optional)"
            value={form.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </form>
        {generated && (
          <div className="mt-8 p-4 bg-muted rounded border border-muted-foreground whitespace-pre-line">
            <h2 className="font-bold mb-2">Your Cover Letter:</h2>
            <div>{generated}</div>
          </div>
        )}
      </section>
    </main>
  );
}
