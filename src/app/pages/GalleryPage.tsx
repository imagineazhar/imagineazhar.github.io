import { DataGallery } from "@/app/components/DataGallery";
import { useEffect } from "react";
import { buildUrl, setPageMeta } from "@/app/utils/seo";

export function GalleryPage() {
  useEffect(() => {
    setPageMeta({
      title: "Data Visualization Gallery | Muhammad Azhar",
      description:
        "A curated gallery of data visualization work, dashboards, and visual analytics projects.",
      url: buildUrl("/gallery"),
    });
  }, []);

  return (
    <div className="pt-20 section-surface section-grid">
      <h1 className="sr-only">Data Visualization Gallery</h1>
      <DataGallery />
    </div>
  );
}
