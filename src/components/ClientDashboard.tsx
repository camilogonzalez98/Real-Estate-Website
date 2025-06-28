import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Eye, DollarSign } from 'lucide-react';
import PropertyListingForm from './PropertyListingForm';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  offers: Offer[];
}

interface Offer {
  id: string;
  investorId: string;
  amount: number;
  type: 'cash' | 'financed' | 'creative';
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

const ClientDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Beautiful Family Home',
      address: '123 Main St, Miami, FL',
      price: 350000,
      status: 'active',
      offers: [
        {
          id: '1',
          investorId: 'inv1',
          amount: 340000,
          type: 'cash',
          status: 'pending',
          submittedAt: '2024-01-15'
        },
        {
          id: '2',
          investorId: 'inv2',
          amount: 345000,
          type: 'financed',
          status: 'pending',
          submittedAt: '2024-01-16'
        }
      ]
    }
  ]);

  const [showListingForm, setShowListingForm] = useState(false);

  const handleAcceptOffer = (propertyId: string, offerId: string) => {
    setProperties(prev => prev.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          offers: property.offers.map(offer => 
            offer.id === offerId 
              ? { ...offer, status: 'accepted' as const }
              : { ...offer, status: 'rejected' as const }
          ),
          status: 'pending' as const
        };
      }
      return property;
    }));
  };

  const handleRejectOffer = (propertyId: string, offerId: string) => {
    setProperties(prev => prev.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          offers: property.offers.map(offer => 
            offer.id === offerId 
              ? { ...offer, status: 'rejected' as const }
              : offer
          )
        };
      }
      return property;
    }));
  };

  const handleAddProperty = (propertyData: any) => {
    const newProperty: Property = {
      id: Date.now().toString(),
      title: propertyData.title,
      address: `${propertyData.address}, ${propertyData.city}, ${propertyData.state}`,
      price: propertyData.price,
      status: 'active',
      offers: []
    };
    setProperties(prev => [...prev, newProperty]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Owner Dashboard</h1>
          <Button onClick={() => setShowListingForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            List New Property
          </Button>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">
              <Building className="w-4 h-4 mr-2" />
              My Properties
            </TabsTrigger>
            <TabsTrigger value="offers">
              <DollarSign className="w-4 h-4 mr-2" />
              All Offers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="grid gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{property.title}</CardTitle>
                        <CardDescription>{property.address}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ${property.price.toLocaleString()}
                        </p>
                        <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {property.offers.length} offer(s) received
                      </p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="space-y-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle>{property.title}</CardTitle>
                    <CardDescription>{property.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {property.offers.map((offer) => (
                        <div key={offer.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className="font-semibold">${offer.amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                {offer.type} • Submitted {offer.submittedAt}
                              </p>
                            </div>
                            <Badge variant={offer.status === 'pending' ? 'default' : offer.status === 'accepted' ? 'default' : 'destructive'}>
                              {offer.status}
                            </Badge>
                          </div>
                          {offer.status === 'pending' && (
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm" 
                                onClick={() => handleAcceptOffer(property.id, offer.id)}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectOffer(property.id, offer.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showListingForm && (
          <PropertyListingForm
            onClose={() => setShowListingForm(false)}
            onSubmit={handleAddProperty}
          />
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;