import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  status: string;
  created_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Real Estate Investment Trends 2024",
      content: "The real estate market continues to evolve...",
      author: "Admin",
      status: "published",
      created_at: "2024-01-10"
    },
    {
      id: "2",
      title: "How to Evaluate Investment Properties",
      content: "When looking at potential investment properties...",
      author: "Admin",
      status: "draft",
      created_at: "2024-01-12"
    }
  ]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const createNewPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: "",
      content: "",
      author: "Admin",
      status: "draft",
      created_at: new Date().toISOString()
    };
    setEditingPost(newPost);
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const editPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const savePost = () => {
    if (!editingPost) return;
    
    if (isCreating) {
      setPosts(prev => [editingPost, ...prev]);
    } else {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
    }
    
    setIsDialogOpen(false);
    setEditingPost(null);
    setIsCreating(false);
  };

  const deletePost = (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const toggleStatus = (id: string) => {
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-gray-600">Create and manage blog posts</p>
        </div>
        <Button onClick={createNewPost}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-600">Author: {post.author}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {post.content.substring(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => editPost(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(post.id)}>
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deletePost(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Create New Post' : 'Edit Post'}</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  placeholder="Enter post content"
                  rows={10}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={savePost}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManager;