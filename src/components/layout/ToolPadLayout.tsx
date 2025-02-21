import { AppProvider, DashboardLayout, Navigation } from "@toolpad/core";
import { useRouter } from "next/navigation";
import DashboardIconSVG from "../svg-icons/DashboardIconSVG";
import OnboardingIconSVG from "../svg-icons/OnboardingIconSVG";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Overview",
  },
  {
    title: "Dashboard",
    icon: <DashboardIconSVG />,
    pattern: "/",
  },
  {
    segment: "onboarding",
    title: "Onboarding",
    icon: <OnboardingIconSVG />,
  },
];

const ToolPadLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/images/logo.png" alt="logo" />,
        homeUrl: "/",
        title: "",
      }}
      //   router={router}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
};

export default ToolPadLayout;
