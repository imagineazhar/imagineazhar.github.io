import { HeroSection } from "@/app/components/HeroSection";
import { AboutSection } from "@/app/components/AboutSection";
import { ServicesSection } from "@/app/components/ServicesSection";
import { SelectedWork } from "@/app/components/SelectedWork";
import { WritingSection } from "@/app/components/WritingSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when component mounts
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    setPageMeta({
      title: "Muhammad Azhar | Data Analytics Specialist",
      description:
        "Data analytics specialist focused on data visualization and enterprise data strategy.",
      url: buildUrl("/"),
    });
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SelectedWork />
      <WritingSection />
    </>
  );
}
