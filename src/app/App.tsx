import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { HomePage } from "@/app/pages/HomePage";
import { CaseStudyPage } from "@/app/pages/CaseStudyPage";

export default function App() {
  return (
    <Router>
      <div className="size-full">
        <Navbar />
        <main role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
