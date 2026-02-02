import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { HomePage } from "@/app/pages/HomePage";
import { GalleryPage } from "@/app/pages/GalleryPage";
import { CaseStudyPage } from "@/app/pages/CaseStudyPage";

export default function App() {
  return (
    <Router>
      <div className="size-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}