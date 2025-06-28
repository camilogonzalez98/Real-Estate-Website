import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Edit, Trash2, CheckCircle, XCircle, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Property {
  id: string;
  address: string;
  price: number;
  description: string;
  status: string;
  created_at: string;
}

const PropertyManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      await fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };

  const saveProperty = async () => {
    if (!editingProperty) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          address: editingProperty.address,
          price: editingProperty.price,
          description: editingProperty.description
        })
        .eq('id', editingProperty.id);
      
      if (error) throw error;
      setIsDialogOpen(false);
      setEditingProperty(null);
      await fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Property Management</h2>
          <p className="text-gray-600">Manage all property listings and approvals</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid gap-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{property.address}</h3>
                  <p className="text-gray-600">${property.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{property.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(property.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={property.status === 'published' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(property)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {property.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updatePropertyStatus(property.id, 'published')}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updatePropertyStatus(property.id, 'rejected')}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => deleteProperty(property.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={editingProperty.address}
                  onChange={(e) => setEditingProperty({...editingProperty, address: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={editingProperty.price}
                  onChange={(e) => setEditingProperty({...editingProperty, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({...editingProperty, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={saveProperty}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyManager;