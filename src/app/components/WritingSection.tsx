import { Calendar, Clock, ArrowRight, ExternalLink, Loader2, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Parser from "rss-parser";

interface Article {
  title: string;
  excerpt: string;
  link: string;
  date: string;
  readTime: string;
  categories: string[];
  image?: string;
}

export function WritingSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mediumUsername = "@imagineazhar"; // Medium username from the button link

  useEffect(() => {
    const fetchMediumArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Medium RSS feed URL
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`;

        const response = await fetch(rssUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error('RSS feed error');
        }

        // Parse and format the articles
        const parsedArticles: Article[] = data.items.slice(0, 6).map((item: any) => {
          // Extract text from HTML content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = item.content || item.description || '';
          const textContent = tempDiv.textContent || tempDiv.innerText || '';
          
          // Create excerpt (first 150 characters)
          const excerpt = textContent.substring(0, 150).trim() + '...';

          // Calculate read time (rough estimate: 200 words per minute)
          const wordCount = textContent.split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200));

          // Format date
          const articleDate = new Date(item.pubDate);
          const formattedDate = articleDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          const imageFromContent =
            tempDiv.querySelector('img')?.getAttribute('src') || undefined;

          const image =
            item.thumbnail ||
            item.enclosure?.link ||
            item.enclosure?.url ||
            imageFromContent;

          return {
            title: item.title,
            excerpt: excerpt,
            link: item.link,
            date: formattedDate,
            readTime: `${readTime} min read`,
            categories: item.categories || [],
            image
          };
        });

        setArticles(parsedArticles);
      } catch (err) {
        console.error('Error fetching Medium articles:', err);
        setError('Unable to load articles. Please try again later.');
        
        // Fallback to mock data
        setArticles([
          {
            title: "The Psychology of Color in Data Visualization",
            excerpt: "Understanding how color choices impact data interpretation and decision-making. A deep dive into perception theory and practical applications...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Jan 15, 2026",
            readTime: "8 min read",
            categories: ["Design Theory", "Color Theory"],
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
          },
          {
            title: "Building Real-Time Dashboards with D3.js",
            excerpt: "A technical guide to creating performant, real-time data visualizations that scale to handle thousands of updates per second...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Dec 28, 2025",
            readTime: "12 min read",
            categories: ["Technical", "D3.js"],
            image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80"
          },
          {
            title: "When to Use Tables vs. Charts: A Decision Framework",
            excerpt: "Not every dataset needs a chart. Learn when tables outperform visualizations and how to make the right choice...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Dec 10, 2025",
            readTime: "6 min read",
            categories: ["Best Practices"],
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
          },
          {
            title: "The Hidden Cost of Dashboard Complexity",
            excerpt: "How cognitive load affects dashboard effectiveness and why simplicity often beats feature richness...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Nov 22, 2025",
            readTime: "10 min read",
            categories: ["Case Study"],
            image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=800&q=80"
          },
          {
            title: "Accessible Data Visualization: Beyond WCAG Compliance",
            excerpt: "Creating truly inclusive visualizations that serve users with diverse abilities. Practical techniques for accessibility...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Nov 5, 2025",
            readTime: "9 min read",
            categories: ["Accessibility"],
            image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=800&q=80"
          },
          {
            title: "Data Storytelling: Making Numbers Memorable",
            excerpt: "Transform dry statistics into compelling narratives that drive action and inspire change...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Oct 18, 2025",
            readTime: "7 min read",
            categories: ["Storytelling"],
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumArticles();
  }, []);

  return (
    <section id="writing" className="relative py-32 bg-gray-50">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          {/* Section accent line */}
          <div className="h-1 w-16 bg-accent mb-6"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2] text-black">Writing & Thinking</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-[1.6]">
            Exploring the intersection of design, data, and human perception. Thoughts on best practices, 
            technical deep-dives, and lessons learned from real-world projects.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="ml-3 text-gray-600">Loading articles from Medium...</span>
          </div>
        )}

        {/* Error Message (if applicable) */}
        {error && !loading && (
          <div className="mb-8 p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 text-sm">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                index === 0 ? (
                  <a
                    key={index}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 text-white shadow-lg transition-all duration-300 hover:shadow-2xl lg:col-span-2 lg:row-span-2 min-h-[360px]"
                  >
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 origin-top-left group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.05),_rgba(0,0,0,0.65))]" />

                    <div className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-105">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-end p-8 transition-transform duration-500 group-hover:translate-y-3">
                      <h3 className="text-3xl sm:text-4xl font-medium leading-tight mb-4">
                        {article.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 max-w-2xl">
                        {article.excerpt}
                      </p>
                    </div>
                  </a>
                ) : (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer block min-h-[260px] overflow-hidden"
                >
                  <div className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-105">
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  {/* Category Badge */}
                  <div className="mb-8 flex items-center gap-3 transition-transform duration-500 group-hover:translate-y-2">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gradient-to-br from-gray-200 via-white to-gray-300 p-[2px] transition-transform duration-500 origin-top-left group-hover:scale-110">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full rounded-md object-cover transition-transform duration-500 origin-top-left group-hover:scale-125"
                        />
                      ) : (
                        <div className="h-full w-full rounded-md bg-white shadow-inner" />
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium mb-3 text-black group-hover:text-gray-700 transition-colors leading-[1.3] transition-transform duration-500 group-hover:translate-y-3">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-[1.5] mb-6 transition-transform duration-500 group-hover:translate-y-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.categories.slice(1, 4).map((category, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs text-gray-500 leading-none"
                        >
                          #{category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </a>
                )
              ))}
            </div>

            {/* See More on Medium Button */}
            <div className="text-center">
              <a
                href="https://medium.com/@imagineazhar"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn-luma btn-luma--primary inline-flex items-center gap-3 px-8 py-4 text-base font-medium transition-all duration-300"
              >
                <span>See more on Medium</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
