import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    askingPrice: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <Lock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Property Submitted for Review</h2>
            <p className="text-gray-600">
              Your property has been submitted and is pending admin approval. 
              We will contact you once it has been reviewed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>List Your Property</CardTitle>
        <CardDescription>
          Submit your property for review. All listings require admin approval before being published.
        </CardDescription>
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Properties are reviewed by our admin team to ensure quality and prevent fake listings.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Property Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter full property address"
                required
              />
            </div>
            <div>
              <Label htmlFor="askingPrice">Asking Price *</Label>
              <Input
                id="askingPrice"
                type="number"
                value={formData.askingPrice}
                onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                placeholder="Enter asking price"
                required
              />
            </div>
            <div>
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                placeholder="Enter owner name"
                required
              />
            </div>
            <div>
              <Label htmlFor="ownerPhone">Phone Number *</Label>
              <Input
                id="ownerPhone"
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <Label htmlFor="ownerEmail">Email Address *</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Property Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your property (bedrooms, bathrooms, features, etc.)"
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Property for Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;