import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, DollarSign } from 'lucide-react';
import InvestorVerification from './InvestorVerification';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  description: string;
}

interface MyOffer {
  id: string;
  propertyId: string;
  propertyTitle: string;
  amount: number;
  type: 'cash' | 'financed' | 'creative';
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

const InvestorDashboard = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Beautiful Family Home',
      address: '123 Main St, Miami, FL',
      price: 350000,
      description: 'Spacious 4BR/3BA home in desirable neighborhood'
    },
    {
      id: '2',
      title: 'Investment Opportunity',
      address: '456 Oak Ave, Fort Lauderdale, FL',
      price: 275000,
      description: 'Great rental property with high ROI potential'
    }
  ]);

  const [myOffers, setMyOffers] = useState<MyOffer[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerType, setOfferType] = useState<'cash' | 'financed' | 'creative'>('cash');

  const handleVerificationComplete = () => {
    setIsVerified(true);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please complete verification first');
      return;
    }
    
    const property = properties.find(p => p.id === selectedProperty);
    if (property && offerAmount) {
      const newOffer: MyOffer = {
        id: Date.now().toString(),
        propertyId: selectedProperty!,
        propertyTitle: property.title,
        amount: parseFloat(offerAmount),
        type: offerType,
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0]
      };
      setMyOffers(prev => [...prev, newOffer]);
      setSelectedProperty(null);
      setOfferAmount('');
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Investor Portal</h1>
          <InvestorVerification onVerificationComplete={handleVerificationComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">
              <Search className="w-4 h-4 mr-2" />
              Browse Properties
            </TabsTrigger>
            <TabsTrigger value="offers">
              <DollarSign className="w-4 h-4 mr-2" />
              My Offers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="grid gap-6">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{property.title}</CardTitle>
                        <CardDescription>{property.address}</CardDescription>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        ${property.price.toLocaleString()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <Button onClick={() => setSelectedProperty(property.id)}>
                      Make Offer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="space-y-4">
              {myOffers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No offers submitted yet</p>
                  </CardContent>
                </Card>
              ) : (
                myOffers.map((offer) => (
                  <Card key={offer.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{offer.propertyTitle}</CardTitle>
                          <CardDescription>
                            ${offer.amount.toLocaleString()} • {offer.type} • {offer.submittedAt}
                          </CardDescription>
                        </div>
                        <Badge variant={offer.status === 'pending' ? 'default' : offer.status === 'accepted' ? 'default' : 'destructive'}>
                          {offer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Submit Offer</CardTitle>
                <CardDescription>
                  {properties.find(p => p.id === selectedProperty)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOffer} className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Offer Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Offer Type</Label>
                    <Select value={offerType} onValueChange={(value: 'cash' | 'financed' | 'creative') => setOfferType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="financed">Financed</SelectItem>
                        <SelectItem value="creative">Creative Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="proof">Proof of Funds</Label>
                    <Input
                      id="proof"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Submit Offer
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setSelectedProperty(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;