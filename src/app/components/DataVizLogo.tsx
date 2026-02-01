import { Download } from "lucide-react";

export function DataVizLogo() {
  const downloadSVG = (size: number, filename: string) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size.toString());
    svg.setAttribute("height", size.toString());
    svg.setAttribute("viewBox", "0 0 240 240");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    svg.innerHTML = `
      <!-- Central Spark -->
      <circle cx="120" cy="120" r="8" fill="#000000"/>
      
      <!-- Expanding Signal Waves -->
      <g>
        <!-- Inner Wave -->
        <path 
          d="M 120 80 Q 140 90, 145 110 Q 148 120, 145 130 Q 140 150, 120 160 Q 100 150, 95 130 Q 92 120, 95 110 Q 100 90, 120 80 Z" 
          stroke="#000000"
          stroke-width="2"
          fill="none"
          opacity="0.6"
        />
        
        <!-- Middle Wave -->
        <path 
          d="M 120 60 Q 155 70, 165 110 Q 170 120, 165 130 Q 155 170, 120 180 Q 85 170, 75 130 Q 70 120, 75 110 Q 85 70, 120 60 Z" 
          stroke="#000000"
          stroke-width="2"
          fill="none"
          opacity="0.4"
        />
        
        <!-- Outer Wave -->
        <path 
          d="M 120 40 Q 170 55, 185 110 Q 192 120, 185 130 Q 170 185, 120 200 Q 70 185, 55 130 Q 48 120, 55 110 Q 70 55, 120 40 Z" 
          stroke="#000000"
          stroke-width="2"
          fill="none"
          opacity="0.2"
        />
      </g>
      
      <!-- Flowing Data Streams -->
      <g opacity="0.8">
        <!-- Upper Right Flow -->
        <path 
          d="M 125 115 Q 145 100, 165 95 Q 175 93, 180 98" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="180" cy="98" r="4" fill="#000000"/>
        <circle cx="165" cy="95" r="3" fill="#000000" opacity="0.7"/>
        
        <!-- Right Flow -->
        <path 
          d="M 128 120 Q 155 120, 175 118 Q 185 117, 190 120" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="190" cy="120" r="4" fill="#000000"/>
        <circle cx="175" cy="118" r="3" fill="#000000" opacity="0.7"/>
        
        <!-- Lower Right Flow -->
        <path 
          d="M 125 125 Q 145 140, 165 145 Q 175 147, 180 142" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="180" cy="142" r="4" fill="#000000"/>
        <circle cx="165" cy="145" r="3" fill="#000000" opacity="0.7"/>
        
        <!-- Upper Left Flow -->
        <path 
          d="M 115 115 Q 95 100, 75 95 Q 65 93, 60 98" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="60" cy="98" r="4" fill="#000000"/>
        <circle cx="75" cy="95" r="3" fill="#000000" opacity="0.7"/>
        
        <!-- Left Flow -->
        <path 
          d="M 112 120 Q 85 120, 65 118 Q 55 117, 50 120" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="50" cy="120" r="4" fill="#000000"/>
        <circle cx="65" cy="118" r="3" fill="#000000" opacity="0.7"/>
        
        <!-- Lower Left Flow -->
        <path 
          d="M 115 125 Q 95 140, 75 145 Q 65 147, 60 142" 
          stroke="#000000" 
          stroke-width="2.5" 
          fill="none"
          stroke-linecap="round"
        />
        <circle cx="60" cy="142" r="4" fill="#000000"/>
        <circle cx="75" cy="145" r="3" fill="#000000" opacity="0.7"/>
      </g>
      
      <!-- Analytical Grid Lines -->
      <g opacity="0.15">
        <line x1="30" y1="90" x2="210" y2="90" stroke="#000000" stroke-width="0.5"/>
        <line x1="30" y1="120" x2="210" y2="120" stroke="#000000" stroke-width="0.5"/>
        <line x1="30" y1="150" x2="210" y2="150" stroke="#000000" stroke-width="0.5"/>
        <line x1="90" y1="30" x2="90" y2="210" stroke="#000000" stroke-width="0.5"/>
        <line x1="120" y1="30" x2="120" y2="210" stroke="#000000" stroke-width="0.5"/>
        <line x1="150" y1="30" x2="150" y2="210" stroke="#000000" stroke-width="0.5"/>
      </g>
      
      <!-- Particle Field -->
      <g opacity="0.3">
        <circle cx="80" cy="70" r="1.5" fill="#000000"/>
        <circle cx="160" cy="75" r="1.5" fill="#000000"/>
        <circle cx="70" cy="165" r="1.5" fill="#000000"/>
        <circle cx="170" cy="170" r="1.5" fill="#000000"/>
        <circle cx="95" cy="55" r="1" fill="#000000"/>
        <circle cx="145" cy="58" r="1" fill="#000000"/>
        <circle cx="92" cy="182" r="1" fill="#000000"/>
        <circle cx="148" cy="185" r="1" fill="#000000"/>
      </g>
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

  const downloadPNG = (size: number, filename: string) => {
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
    svg.setAttribute("viewBox", "0 0 240 240");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    
    svg.innerHTML = `
      <circle cx="120" cy="120" r="8" fill="#000000"/>
      <g>
        <path d="M 120 80 Q 140 90, 145 110 Q 148 120, 145 130 Q 140 150, 120 160 Q 100 150, 95 130 Q 92 120, 95 110 Q 100 90, 120 80 Z" stroke="#000000" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M 120 60 Q 155 70, 165 110 Q 170 120, 165 130 Q 155 170, 120 180 Q 85 170, 75 130 Q 70 120, 75 110 Q 85 70, 120 60 Z" stroke="#000000" stroke-width="2" fill="none" opacity="0.4"/>
        <path d="M 120 40 Q 170 55, 185 110 Q 192 120, 185 130 Q 170 185, 120 200 Q 70 185, 55 130 Q 48 120, 55 110 Q 70 55, 120 40 Z" stroke="#000000" stroke-width="2" fill="none" opacity="0.2"/>
      </g>
      <g opacity="0.8">
        <path d="M 125 115 Q 145 100, 165 95 Q 175 93, 180 98" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="180" cy="98" r="4" fill="#000000"/>
        <circle cx="165" cy="95" r="3" fill="#000000" opacity="0.7"/>
        <path d="M 128 120 Q 155 120, 175 118 Q 185 117, 190 120" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="190" cy="120" r="4" fill="#000000"/>
        <circle cx="175" cy="118" r="3" fill="#000000" opacity="0.7"/>
        <path d="M 125 125 Q 145 140, 165 145 Q 175 147, 180 142" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="180" cy="142" r="4" fill="#000000"/>
        <circle cx="165" cy="145" r="3" fill="#000000" opacity="0.7"/>
        <path d="M 115 115 Q 95 100, 75 95 Q 65 93, 60 98" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="98" r="4" fill="#000000"/>
        <circle cx="75" cy="95" r="3" fill="#000000" opacity="0.7"/>
        <path d="M 112 120 Q 85 120, 65 118 Q 55 117, 50 120" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="120" r="4" fill="#000000"/>
        <circle cx="65" cy="118" r="3" fill="#000000" opacity="0.7"/>
        <path d="M 115 125 Q 95 140, 75 145 Q 65 147, 60 142" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="60" cy="142" r="4" fill="#000000"/>
        <circle cx="75" cy="145" r="3" fill="#000000" opacity="0.7"/>
      </g>
      <g opacity="0.15">
        <line x1="30" y1="90" x2="210" y2="90" stroke="#000000" stroke-width="0.5"/>
        <line x1="30" y1="120" x2="210" y2="120" stroke="#000000" stroke-width="0.5"/>
        <line x1="30" y1="150" x2="210" y2="150" stroke="#000000" stroke-width="0.5"/>
        <line x1="90" y1="30" x2="90" y2="210" stroke="#000000" stroke-width="0.5"/>
        <line x1="120" y1="30" x2="120" y2="210" stroke="#000000" stroke-width="0.5"/>
        <line x1="150" y1="30" x2="150" y2="210" stroke="#000000" stroke-width="0.5"/>
      </g>
      <g opacity="0.3">
        <circle cx="80" cy="70" r="1.5" fill="#000000"/>
        <circle cx="160" cy="75" r="1.5" fill="#000000"/>
        <circle cx="70" cy="165" r="1.5" fill="#000000"/>
        <circle cx="170" cy="170" r="1.5" fill="#000000"/>
        <circle cx="95" cy="55" r="1" fill="#000000"/>
        <circle cx="145" cy="58" r="1" fill="#000000"/>
        <circle cx="92" cy="182" r="1" fill="#000000"/>
        <circle cx="148" cy="185" r="1" fill="#000000"/>
      </g>
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
      <div className="flex items-center justify-center">
        {/* Logo SVG - Dynamic Expanding Form */}
        <svg 
          width="240" 
          height="240" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Central Spark - The Moment of Insight */}
          <circle cx="120" cy="120" r="8" fill="#000000" className="animate-pulse"/>
          
          {/* Expanding Signal Waves - Ideas Radiating Outward */}
          <g className="origin-center" style={{animation: 'expand 3s ease-in-out infinite'}}>
            {/* Inner Wave */}
            <path 
              d="M 120 80 Q 140 90, 145 110 Q 148 120, 145 130 Q 140 150, 120 160 Q 100 150, 95 130 Q 92 120, 95 110 Q 100 90, 120 80 Z" 
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            
            {/* Middle Wave */}
            <path 
              d="M 120 60 Q 155 70, 165 110 Q 170 120, 165 130 Q 155 170, 120 180 Q 85 170, 75 130 Q 70 120, 75 110 Q 85 70, 120 60 Z" 
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
            
            {/* Outer Wave */}
            <path 
              d="M 120 40 Q 170 55, 185 110 Q 192 120, 185 130 Q 170 185, 120 200 Q 70 185, 55 130 Q 48 120, 55 110 Q 70 55, 120 40 Z" 
              stroke="#000000"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
          </g>
          
          {/* Flowing Data Streams - Patterns Unfolding */}
          <g opacity="0.8">
            {/* Upper Right Flow */}
            <path 
              d="M 125 115 Q 145 100, 165 95 Q 175 93, 180 98" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.3s'}}
            />
            <circle cx="180" cy="98" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
            <circle cx="165" cy="95" r="3" fill="#000000" opacity="0.7"/>
            
            {/* Right Flow */}
            <path 
              d="M 128 120 Q 155 120, 175 118 Q 185 117, 190 120" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.6s'}}
            />
            <circle cx="190" cy="120" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
            <circle cx="175" cy="118" r="3" fill="#000000" opacity="0.7"/>
            
            {/* Lower Right Flow */}
            <path 
              d="M 125 125 Q 145 140, 165 145 Q 175 147, 180 142" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.9s'}}
            />
            <circle cx="180" cy="142" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
            <circle cx="165" cy="145" r="3" fill="#000000" opacity="0.7"/>
            
            {/* Upper Left Flow */}
            <path 
              d="M 115 115 Q 95 100, 75 95 Q 65 93, 60 98" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.2s'}}
            />
            <circle cx="60" cy="98" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
            <circle cx="75" cy="95" r="3" fill="#000000" opacity="0.7"/>
            
            {/* Left Flow */}
            <path 
              d="M 112 120 Q 85 120, 65 118 Q 55 117, 50 120" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.5s'}}
            />
            <circle cx="50" cy="120" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="65" cy="118" r="3" fill="#000000" opacity="0.7"/>
            
            {/* Lower Left Flow */}
            <path 
              d="M 115 125 Q 95 140, 75 145 Q 65 147, 60 142" 
              stroke="#000000" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{animationDelay: '0.8s'}}
            />
            <circle cx="60" cy="142" r="4" fill="#000000" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
            <circle cx="75" cy="145" r="3" fill="#000000" opacity="0.7"/>
          </g>
          
          {/* Analytical Grid Lines - Precision in the Background */}
          <g opacity="0.15">
            <line x1="30" y1="90" x2="210" y2="90" stroke="#000000" strokeWidth="0.5"/>
            <line x1="30" y1="120" x2="210" y2="120" stroke="#000000" strokeWidth="0.5"/>
            <line x1="30" y1="150" x2="210" y2="150" stroke="#000000" strokeWidth="0.5"/>
            <line x1="90" y1="30" x2="90" y2="210" stroke="#000000" strokeWidth="0.5"/>
            <line x1="120" y1="30" x2="120" y2="210" stroke="#000000" strokeWidth="0.5"/>
            <line x1="150" y1="30" x2="150" y2="210" stroke="#000000" strokeWidth="0.5"/>
          </g>
          
          {/* Particle Field - Raw Data Points */}
          <g opacity="0.3">
            <circle cx="80" cy="70" r="1.5" fill="#000000"/>
            <circle cx="160" cy="75" r="1.5" fill="#000000"/>
            <circle cx="70" cy="165" r="1.5" fill="#000000"/>
            <circle cx="170" cy="170" r="1.5" fill="#000000"/>
            <circle cx="95" cy="55" r="1" fill="#000000"/>
            <circle cx="145" cy="58" r="1" fill="#000000"/>
            <circle cx="92" cy="182" r="1" fill="#000000"/>
            <circle cx="148" cy="185" r="1" fill="#000000"/>
          </g>
        </svg>
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
              onClick={() => downloadSVG(512, "logo-512.svg")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              512×512
            </button>
            <button
              onClick={() => downloadSVG(1024, "logo-1024.svg")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              1024×1024
            </button>
            <button
              onClick={() => downloadSVG(2048, "logo-2048.svg")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              2048×2048
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
              onClick={() => downloadPNG(256, "logo-256.png")}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              256×256
            </button>
            <button
              onClick={() => downloadPNG(512, "logo-512.png")}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              512×512
            </button>
            <button
              onClick={() => downloadPNG(1024, "logo-1024.png")}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              1024×1024
            </button>
            <button
              onClick={() => downloadPNG(2048, "logo-2048.png")}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              2048×2048
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