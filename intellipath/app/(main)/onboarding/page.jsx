import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage({ searchParams }) {
  // In Next.js 15+, searchParams is a promise
  const resolvedParams = await searchParams;
  const isEdit = resolvedParams?.edit === "true";

  // Check if user is already onboarded
  const { isOnboarded, userData } = await getUserOnboardingStatus();

  if (isOnboarded && !isEdit) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} initialData={userData} />
    </main>
  );
}
