import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, User, FileText, Home, MessageSquare } from "lucide-react";

interface ActivityLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  created_at: string;
}

const ActivityLogs = () => {
  const [logs] = useState<ActivityLog[]>([
    {
      id: "1",
      user_id: "admin",
      user_name: "Admin",
      action: "Property Approved",
      entity_type: "property",
      entity_id: "prop_123",
      details: "Approved property listing at 123 Main St",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      user_id: "user_456",
      user_name: "John Smith",
      action: "Offer Submitted",
      entity_type: "offer",
      entity_id: "offer_789",
      details: "Submitted offer of $250,000 for 123 Main St",
      created_at: "2024-01-15T09:15:00Z"
    },
    {
      id: "3",
      user_id: "admin",
      user_name: "Admin",
      action: "Blog Post Published",
      entity_type: "blog_post",
      entity_id: "post_101",
      details: "Published blog post: Real Estate Trends 2024",
      created_at: "2024-01-15T08:45:00Z"
    },
    {
      id: "4",
      user_id: "user_789",
      user_name: "Jane Doe",
      action: "User Registered",
      entity_type: "user",
      entity_id: "user_789",
      details: "New user registration as investor",
      created_at: "2024-01-14T16:20:00Z"
    },
    {
      id: "5",
      user_id: "admin",
      user_name: "Admin",
      action: "Verification Approved",
      entity_type: "verification",
      entity_id: "ver_555",
      details: "Approved investor verification for ABC Corp",
      created_at: "2024-01-14T14:10:00Z"
    }
  ]);
  
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getIcon = (entityType: string) => {
    switch (entityType) {
      case 'property': return <Home className="h-4 w-4" />;
      case 'offer': return <FileText className="h-4 w-4" />;
      case 'blog_post': return <MessageSquare className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('Approved') || action.includes('Published')) return 'default';
    if (action.includes('Rejected') || action.includes('Deleted')) return 'destructive';
    if (action.includes('Submitted') || action.includes('Created')) return 'secondary';
    return 'outline';
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.entity_type === filter;
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Activity Logs</h2>
        <p className="text-gray-600">View all platform activity and actions</p>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="property">Properties</SelectItem>
            <SelectItem value="offer">Offers</SelectItem>
            <SelectItem value="blog_post">Blog Posts</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="verification">Verifications</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(log.entity_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{log.user_name}</span>
                      <Badge variant={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>Entity: {log.entity_type}</span>
                      <span>ID: {log.entity_id}</span>
                      <span>{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No activity logs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;