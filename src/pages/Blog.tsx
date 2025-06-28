import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Real Estate Investment Strategies",
      excerpt: "Learn about different approaches to real estate investing and how to choose the right strategy for your goals.",
      author: "BESD Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Investment",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "The Benefits of Selling Your Property Fast",
      excerpt: "Discover why quick property sales can be advantageous and how our process works.",
      author: "BESD Team",
      date: "2024-01-10",
      readTime: "3 min read",
      category: "Selling",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Market Trends in Real Estate 2024",
      excerpt: "Stay updated with the latest trends and predictions in the real estate market.",
      author: "BESD Team",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Market Analysis",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest insights, tips, and trends in real estate investing and property sales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4">{post.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;