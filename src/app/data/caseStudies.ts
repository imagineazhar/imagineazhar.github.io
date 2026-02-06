export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  tools: string[];
  metrics: string[];
  image: string;
  // Detailed case study content
  overview: string;
  challenge: string;
  approach: string[];
  solution: string;
  results: {
    metric: string;
    description: string;
  }[];
  reflection?: string[];
  dashboardGallery?: {
    title: string;
    description: string;
    image: string;
    insights: string[];
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  gallery: string[];
  tags: string[];
  duration: string;
  team: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Treasury Insight Suite",
    client: "ENBD Treasury Team",
    category: "Banking",
    description:
      "Decision-ready dashboards across FX, Fixed Deposits, and Derivatives so Treasury leadership could make strategic, operational, and risk calls with speed and confidence.",
    tools: ["Tableau", "SQL", "Figma"],
    metrics: ["3 product lines", "1 unified framework", "Treasury-wide adoption"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZGF0YSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    overview:
      "The Treasury department manages FX, Fixed Deposits, and Derivatives products. Leadership needed decision-ready dashboards across all verticals to support strategic, operational, and risk decisions. I led the design and development of dashboards for each product line, balancing UX, speed, and clarity, and delivered both migrated and greenfield dashboards that became the backbone of Treasury reporting.",
    challenge:
      "FX dashboards were slow, difficult to navigate, and limited in supporting rapid director-level decisions. The migration required performance improvements and a UX redesign. Fixed Deposits and Derivatives had no dashboards at all. The core challenge was that each product had unique stakeholders, metrics, and reporting needs, while a consistent analytical framework was required to reduce cognitive friction and drive adoption.",
    approach: [
      "Redesigned the FX layout and navigation for clarity and speed, while optimizing data pipelines to reduce load times",
      "Defined product-specific KPIs and reporting needs for Fixed Deposits and Derivatives from scratch",
      "Built new dashboards using decision-first design principles focused on director-level workflows",
      "Created a consistent visual language and interaction pattern to reduce cognitive friction across products",
      "Prioritized actionable insights over decorative visuals to keep attention on key signals",
      "Applied a modular layout so future products could be added without redesigning the system",
    ],
    solution:
      "FX migrated to a faster, cleaner UX with decision-critical metrics immediately visible. Fixed Deposits and Derivatives gained full dashboards where none existed. Across all products, standardized layouts and interaction patterns improved trust and familiarity while integrating cleanly into the existing Treasury reporting ecosystem.",
    results: [
      {
        metric: "Minutes to insights",
        description:
          "Directors and senior teams moved from hours of manual reporting to decision-ready dashboards in minutes",
      },
      {
        metric: "Higher adoption",
        description:
          "Consistent UX and shared analytical language increased trust and adoption across the Treasury department",
      },
      {
        metric: "Scalable framework",
        description:
          "A modular system now supports future Treasury products without redesigning the experience",
      },
      {
        metric: "Decision support",
        description:
          "Dashboards evolved from operational reporting to strategic and risk decision tools",
      },
    ],
    reflection: [
      "Migrating dashboards is an opportunity to improve UX and speed, not just replicate functionality",
      "Greenfield projects allow decision-first thinking to be embedded from day one",
      "Consistency in design and structure strengthens adoption and confidence among stakeholders",
      "Analytical design must balance business context, stakeholder needs, and technical constraints",
    ],
    dashboardGallery: [
      {
        title: "FX Performance Dashboard",
        description:
          "Migration redesign focused on speed, clarity, and director-level decisions.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        insights: [
          "Exposure and PnL surfaced above the fold for immediate triage",
          "Navigation reduced to three primary decision paths",
        ],
      },
      {
        title: "Fixed Deposits Overview",
        description: "Greenfield KPI framework for pricing, volume, and maturity risk.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5c2NhbGUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY5Njg3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        insights: [
          "Rate ladder highlights margin compression by tenor",
          "Maturity concentration flags rollover risk",
        ],
      },
      {
        title: "Derivatives Risk Lens",
        description:
          "Decision-first view of hedge effectiveness and exposure.",
        image:
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY5Njg3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        insights: [
          "Hedge coverage and VaR aligned on a single decision panel",
          "Exception thresholds surfaced as alert tags",
        ],
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5c2NhbGUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY5Njg3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY5Njg3NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tags: ["Banking", "Executive Analytics", "Dashboard Design"],
    duration: "6 months",
    team: "2 data analysts, 1 designer, 1 developer",
  },

  {
    id: "financial-performance-dashboard",
    title: "Financial Performance Dashboard",
    client: "Global Investment Firm",
    category: "Finance",
    description: "Real-time portfolio analytics with interactive drill-downs, risk assessments, and predictive modeling for $2B+ in managed assets.",
    tools: ["D3.js", "React", "Power BI"],
    metrics: ["60% faster insights", "Real-time updates", "$15M saved annually"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBncmFwaHMlMjBtZXRyaWNzfGVufDF8fHx8MTc2OTY4NzY5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    overview: "A global investment firm managing over $2B in assets needed a sophisticated analytics platform to track portfolio performance, assess risk exposure, and identify investment opportunities in real-time. The solution required seamless integration with multiple data sources and the ability to handle high-frequency market data updates.",
    challenge: "Portfolio managers were making critical investment decisions based on data that was hours or even days old. The existing systems couldn't handle the velocity of market data, and key insights were buried in static reports. The firm needed a solution that could process thousands of data points per second while presenting complex financial information in an intuitive, actionable format.",
    approach: [
      "Architected a real-time data pipeline using WebSocket connections to market data feeds",
      "Developed custom D3.js visualizations optimized for high-frequency updates without performance degradation",
      "Created a modular dashboard system allowing portfolio managers to customize their views",
      "Implemented predictive analytics models to forecast portfolio performance and risk scenarios",
      "Designed color-coded risk indicators following financial industry standards",
      "Built responsive layouts optimized for both desktop trading stations and mobile monitoring"
    ],
    solution: "The platform features interactive visualizations that update in real-time as market conditions change. Custom-built D3.js charts show portfolio composition, sector allocation, and risk exposure with drill-down capabilities to individual securities. Predictive models run continuously in the background, alerting managers to potential risks or opportunities. The interface adapts to different user roles, showing relevant metrics to traders, analysts, and executives.",
    results: [
      {
        metric: "60% Faster Insights",
        description: "Portfolio managers can identify trends and make decisions 60% faster with real-time data visualization"
      },
      {
        metric: "Real-time Updates",
        description: "Dashboard refreshes automatically with sub-second latency, ensuring decisions are based on current market conditions"
      },
      {
        metric: "$15M Saved Annually",
        description: "Improved decision-making and risk management led to measurable cost savings and better returns"
      },
      {
        metric: "Zero Downtime",
        description: "Mission-critical system maintains 99.99% uptime during trading hours"
      }
    ],
    testimonial: {
      quote: "Having real-time visibility into our entire portfolio has been transformational. We can now respond to market changes instantly and identify opportunities that would have been invisible with our old reporting system.",
      author: "James Rodriguez",
      role: "Head of Portfolio Management"
    },
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    ],
    tags: ["Finance", "Real-time Data", "Predictive Analytics", "D3.js"],
    duration: "8 months",
    team: "5 developers, 2 data scientists, 1 UX designer"
  },
  {
    id: "network-intelligence-platform",
    title: "Network Intelligence Platform",
    client: "Telecom Corporation",
    category: "Technology",
    description: "Interactive network topology visualization mapping 50K+ nodes, traffic patterns, and anomaly detection for infrastructure monitoring.",
    tools: ["D3.js", "Observable", "WebGL"],
    metrics: ["85% faster detection", "50K+ nodes", "99.9% uptime"],
    image: "https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRhdGElMjB2aXN1YWxpemF0aW9uJTIwbmV0d29ya3xlbnwxfHx8fDE3Njk2ODc2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    overview: "A major telecommunications corporation needed to visualize and monitor their complex network infrastructure spanning 50,000+ nodes across multiple regions. The goal was to detect anomalies quickly, understand traffic patterns, and prevent outages before they impact customers.",
    challenge: "Network engineers were drowning in data from thousands of network devices, unable to spot patterns or anomalies until customers reported issues. Traditional monitoring tools showed isolated metrics but couldn't visualize the interconnected nature of the network. Engineers needed a way to see the entire network topology at a glance while being able to drill down into specific problem areas.",
    approach: [
      "Designed a force-directed graph visualization using D3.js to represent network topology naturally",
      "Implemented WebGL rendering for smooth performance when displaying 50K+ nodes simultaneously",
      "Created hierarchical zoom levels allowing engineers to view the entire network or focus on specific regions",
      "Built real-time anomaly detection algorithms that highlight problematic nodes with visual indicators",
      "Designed color-coded traffic flow visualizations showing bandwidth utilization across connections",
      "Integrated alerting system that automatically focuses the visualization on critical issues"
    ],
    solution: "The platform presents the network as an interactive, living graph where nodes represent network devices and edges show connections. Traffic flows are visualized with animated particles, and anomalies trigger visual alerts with color intensity proportional to severity. Engineers can zoom from a continental view down to individual devices, with the interface automatically highlighting related nodes as they investigate issues. Machine learning models run continuously to predict potential failures before they occur.",
    results: [
      {
        metric: "85% Faster Anomaly Detection",
        description: "Visual patterns make network issues immediately obvious, reducing mean time to detection from hours to minutes"
      },
      {
        metric: "50K+ Nodes Visualized",
        description: "WebGL-accelerated rendering handles massive scale without performance degradation"
      },
      {
        metric: "99.9% Network Uptime",
        description: "Proactive monitoring and faster response times improved overall network reliability"
      },
      {
        metric: "4x Productivity Increase",
        description: "Network engineers can manage larger network segments with the same team size"
      }
    ],
    testimonial: {
      quote: "For the first time, we can actually see our network as an interconnected system rather than a collection of isolated devices. This has completely changed how we approach network management.",
      author: "Michael Chen",
      role: "VP of Network Operations"
    },
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    ],
    tags: ["Network Monitoring", "WebGL", "Real-time Visualization", "Anomaly Detection"],
    duration: "10 months",
    team: "6 developers, 2 network architects, 1 data scientist"
  },
  {
    id: "retail-sales-intelligence",
    title: "Retail Sales Intelligence",
    client: "National Retail Chain",
    category: "Retail",
    description: "Multi-channel sales analytics combining in-store and e-commerce data, customer journey mapping, and inventory optimization across 200+ locations.",
    tools: ["Tableau", "R", "BigQuery"],
    metrics: ["30% revenue increase", "20% inventory reduction", "200+ stores"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzcwMDE1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    overview: "A national retail chain with 200+ locations needed unified analytics across physical stores and e-commerce channels. The challenge was to understand customer behavior across touchpoints, optimize inventory distribution, and identify opportunities for revenue growth while reducing carrying costs.",
    challenge: "The retail chain was operating with siloed data systems—online and in-store sales were tracked separately, making it impossible to understand true customer behavior. Inventory decisions were based on historical patterns rather than real-time demand, leading to stockouts in some locations and overstock in others. Marketing campaigns couldn't be accurately attributed to revenue because customer journeys crossed multiple channels.",
    approach: [
      "Built data pipelines integrating point-of-sale systems, e-commerce platforms, and inventory management",
      "Developed customer journey visualizations showing cross-channel shopping patterns",
      "Created heat maps showing product performance across different store locations and times",
      "Implemented predictive models for inventory optimization based on local demand patterns",
      "Designed role-specific dashboards for store managers, regional directors, and C-suite executives",
      "Built automated reporting systems reducing manual reporting effort by 80%"
    ],
    solution: "The analytics platform provides a 360-degree view of the business, from individual product performance to company-wide trends. Store managers see localized metrics and inventory recommendations. Regional directors can compare performance across locations and identify best practices. Executives get high-level KPIs with the ability to drill down into specifics. The system automatically flags anomalies and opportunities, such as products that are trending in one region but underperforming in another.",
    results: [
      {
        metric: "30% Revenue Increase",
        description: "Better inventory positioning and data-driven marketing decisions led to significant revenue growth"
      },
      {
        metric: "20% Inventory Reduction",
        description: "Optimized inventory distribution reduced carrying costs while maintaining product availability"
      },
      {
        metric: "200+ Stores Optimized",
        description: "Consistent analytics framework deployed across all retail locations"
      },
      {
        metric: "2-Hour Decision Cycle",
        description: "Executives can now make strategic decisions in hours rather than weeks"
      }
    ],
    testimonial: {
      quote: "Understanding our customers' omnichannel behavior has been a game-changer. We're now making inventory and marketing decisions based on data rather than intuition, and the results speak for themselves.",
      author: "Lisa Thompson",
      role: "Chief Operating Officer"
    },
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    ],
    tags: ["Retail Analytics", "Omnichannel", "Inventory Optimization", "Customer Journey"],
    duration: "7 months",
    team: "3 data analysts, 2 developers, 1 business analyst"
  }
];
