import { Download } from "lucide-react";
import { Logo } from "@/app/components/Logo";

export function DataVizLogo() {
  const downloadSVG = (size: number, filename: string, variant: "color" | "monochrome") => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size.toString());
    svg.setAttribute("height", size.toString());
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    const primaryColor = variant === "color" ? "#1E3D59" : "#000000";
    
    svg.innerHTML = `
      <circle cx="50" cy="50" r="42" stroke="${primaryColor}" stroke-width="2.5" fill="none"/>
      <line x1="50" y1="50" x2="50" y2="20" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="71" y2="29" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="80" y2="50" stroke="${primaryColor}" stroke-width="2.5" opacity="0.8"/>
      <line x1="50" y1="50" x2="71" y2="71" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="50" y2="80" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="29" y2="71" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="20" y2="50" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="29" y2="29" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <circle cx="50" cy="50" r="8" fill="${primaryColor}"/>
      <circle cx="50" cy="50" r="24" stroke="${primaryColor}" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="4 4"/>
      <circle cx="50" cy="15" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="76" cy="24" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="85" cy="50" r="3.5" fill="${primaryColor}" opacity="0.9"/>
      <circle cx="76" cy="76" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="50" cy="85" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="24" cy="76" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="15" cy="50" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="24" cy="24" r="2.5" fill="${primaryColor}" opacity="0.5"/>
    `;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  const downloadPNG = (size: number, filename: string, variant: "color" | "monochrome") => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Fill white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size.toString());
    svg.setAttribute("height", size.toString());
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    const primaryColor = variant === "color" ? "#1E3D59" : "#000000";
    
    svg.innerHTML = `
      <circle cx="50" cy="50" r="42" stroke="${primaryColor}" stroke-width="2.5" fill="none"/>
      <line x1="50" y1="50" x2="50" y2="20" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="71" y2="29" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="80" y2="50" stroke="${primaryColor}" stroke-width="2.5" opacity="0.8"/>
      <line x1="50" y1="50" x2="71" y2="71" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="50" y2="80" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="29" y2="71" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="50" x2="20" y2="50" stroke="${primaryColor}" stroke-width="2" opacity="0.6"/>
      <line x1="50" y1="50" x2="29" y2="29" stroke="${primaryColor}" stroke-width="2" opacity="0.5"/>
      <circle cx="50" cy="50" r="8" fill="${primaryColor}"/>
      <circle cx="50" cy="50" r="24" stroke="${primaryColor}" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="4 4"/>
      <circle cx="50" cy="15" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="76" cy="24" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="85" cy="50" r="3.5" fill="${primaryColor}" opacity="0.9"/>
      <circle cx="76" cy="76" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="50" cy="85" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="24" cy="76" r="2.5" fill="${primaryColor}" opacity="0.5"/>
      <circle cx="15" cy="50" r="3" fill="${primaryColor}" opacity="0.7"/>
      <circle cx="24" cy="24" r="2.5" fill="${primaryColor}" opacity="0.5"/>
    `;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const pngUrl = URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = filename;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(pngUrl);
        }
      });
    };
    
    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Logo Display */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Color Version */}
        <div className="flex flex-col items-center gap-4">
          <Logo size={240} variant="color" animated className="drop-shadow-2xl" />
          <span className="text-sm font-medium text-[#1E3D59]">Color Version</span>
        </div>
        
        {/* Monochrome Version */}
        <div className="flex flex-col items-center gap-4">
          <Logo size={240} variant="monochrome" className="drop-shadow-2xl" />
          <span className="text-sm font-medium text-[#1E3D59]">Monochrome Version</span>
        </div>
      </div>

      {/* Download Controls */}
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div className="text-center">
          <h2 className="mb-2">Download Logo</h2>
          <p className="text-sm text-muted-foreground">Choose your preferred format and size</p>
        </div>

        {/* SVG Downloads */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            SVG Format (Vector)
          </h3>
          <p className="text-sm text-muted-foreground">Scalable to any size without quality loss. Best for print and web.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadSVG(512, "logo-512.svg", "color")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              512×512 (Color)
            </button>
            <button
              onClick={() => downloadSVG(1024, "logo-1024.svg", "color")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              1024×1024 (Color)
            </button>
            <button
              onClick={() => downloadSVG(2048, "logo-2048.svg", "color")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              2048×2048 (Color)
            </button>
            <button
              onClick={() => downloadSVG(512, "logo-512.svg", "monochrome")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              512×512 (Monochrome)
            </button>
            <button
              onClick={() => downloadSVG(1024, "logo-1024.svg", "monochrome")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              1024×1024 (Monochrome)
            </button>
            <button
              onClick={() => downloadSVG(2048, "logo-2048.svg", "monochrome")}
              className="btn-luma btn-luma--primary px-4 py-2 transition-opacity"
            >
              2048×2048 (Monochrome)
            </button>
          </div>
        </div>

        {/* PNG Downloads */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            PNG Format (Raster)
          </h3>
          <p className="text-sm text-muted-foreground">High-quality bitmap images. Best for social media and general use.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadPNG(256, "logo-256.png", "color")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              256×256 (Color)
            </button>
            <button
              onClick={() => downloadPNG(512, "logo-512.png", "color")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              512×512 (Color)
            </button>
            <button
              onClick={() => downloadPNG(1024, "logo-1024.png", "color")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              1024×1024 (Color)
            </button>
            <button
              onClick={() => downloadPNG(2048, "logo-2048.png", "color")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              2048×2048 (Color)
            </button>
            <button
              onClick={() => downloadPNG(256, "logo-256.png", "monochrome")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              256×256 (Monochrome)
            </button>
            <button
              onClick={() => downloadPNG(512, "logo-512.png", "monochrome")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              512×512 (Monochrome)
            </button>
            <button
              onClick={() => downloadPNG(1024, "logo-1024.png", "monochrome")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              1024×1024 (Monochrome)
            </button>
            <button
              onClick={() => downloadPNG(2048, "logo-2048.png", "monochrome")}
              className="btn-luma px-4 py-2 transition-colors"
            >
              2048×2048 (Monochrome)
            </button>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-3">
          <h3>Usage Guide</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>SVG:</strong> Use for websites, presentations, and print materials where scaling is needed</li>
            <li><strong>PNG:</strong> Use for social media profiles, favicons, and applications requiring bitmap format</li>
            <li><strong>Size Guide:</strong> 256px for favicons, 512px for social media, 1024px+ for high-resolution displays</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
