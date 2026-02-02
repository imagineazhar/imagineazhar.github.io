import { Calendar, Clock, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Parser from "rss-parser";

interface Article {
  title: string;
  excerpt: string;
  link: string;
  date: string;
  readTime: string;
  categories: string[];
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

          return {
            title: item.title,
            excerpt: excerpt,
            link: item.link,
            date: formattedDate,
            readTime: `${readTime} min read`,
            categories: item.categories || []
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
            categories: ["Design Theory", "Color Theory"]
          },
          {
            title: "Building Real-Time Dashboards with D3.js",
            excerpt: "A technical guide to creating performant, real-time data visualizations that scale to handle thousands of updates per second...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Dec 28, 2025",
            readTime: "12 min read",
            categories: ["Technical", "D3.js"]
          },
          {
            title: "When to Use Tables vs. Charts: A Decision Framework",
            excerpt: "Not every dataset needs a chart. Learn when tables outperform visualizations and how to make the right choice...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Dec 10, 2025",
            readTime: "6 min read",
            categories: ["Best Practices"]
          },
          {
            title: "The Hidden Cost of Dashboard Complexity",
            excerpt: "How cognitive load affects dashboard effectiveness and why simplicity often beats feature richness...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Nov 22, 2025",
            readTime: "10 min read",
            categories: ["Case Study"]
          },
          {
            title: "Accessible Data Visualization: Beyond WCAG Compliance",
            excerpt: "Creating truly inclusive visualizations that serve users with diverse abilities. Practical techniques for accessibility...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Nov 5, 2025",
            readTime: "9 min read",
            categories: ["Accessibility"]
          },
          {
            title: "Data Storytelling: Making Numbers Memorable",
            excerpt: "Transform dry statistics into compelling narratives that drive action and inspire change...",
            link: `https://medium.com/${mediumUsername}`,
            date: "Oct 18, 2025",
            readTime: "7 min read",
            categories: ["Storytelling"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumArticles();
  }, []);

  return (
    <section id="writing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 font-medium leading-[1.2]">Writing & Thinking</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-[1.6]">
            Exploring the intersection of design, data, and human perception. Thoughts on best practices, 
            technical deep-dives, and lessons learned from real-world projects.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#FA9819] animate-spin" />
            <span className="ml-3 text-slate-600">Loading articles from Medium...</span>
          </div>
        )}

        {/* Error Message (if applicable) */}
        {error && !loading && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-[#B6C9CF]/50 rounded-xl p-6 hover:border-[#FA9819] hover:shadow-lg transition-all duration-300 cursor-pointer bg-white block"
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#C6EBF7]/50 text-xs font-medium text-slate-700 rounded-full group-hover:bg-[#FA9819] group-hover:text-white transition-colors leading-none">
                      {article.categories[0] || 'Article'}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#FA9819] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium mb-3 group-hover:text-slate-600 transition-colors leading-[1.3]">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-[1.5] mb-4">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.categories.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.categories.slice(1, 4).map((category, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs text-slate-500 leading-none"
                        >
                          #{category}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
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
              ))}
            </div>

            {/* See More on Medium Button */}
            <div className="text-center">
              <a
                href="https://medium.com/@imagineazhar"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FA9819] text-white text-base font-medium rounded-lg hover:bg-[#e8890f] transition-all duration-300 shadow-lg hover:shadow-xl"
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