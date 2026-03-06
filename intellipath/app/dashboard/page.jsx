import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const IndustryInsightsPage = async () => {

  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="p-10 text-xl text-foreground">
      Industry Insights Page
    </div>
  );
};

export default IndustryInsightsPage;
