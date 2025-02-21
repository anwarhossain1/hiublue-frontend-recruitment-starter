import { AppProvider, DashboardLayout, Navigation } from "@toolpad/core";
import DashboardIconSVG from "../svg-icons/DashboardIconSVG";
import OnboardingIconSVG from "../svg-icons/OnboardingIconSVG";
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Overview",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIconSVG />,
  },
  {
    segment: "onboarding",
    title: "Onboarding",
    icon: <OnboardingIconSVG />,
  },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/images/logo.png" alt="logo" />,
        homeUrl: "/",
        title: "",
      }}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
};

export default MainLayout;
