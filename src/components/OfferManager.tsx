import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, CheckCircle, XCircle, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Offer {
  id: string;
  property_address: string;
  investor_name: string;
  company_name: string;
  amount: number;
  status: string;
  created_at: string;
}

const OfferManager = () => {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      property_address: "123 Main St",
      investor_name: "John Smith",
      company_name: "ABC Corp",
      amount: 250000,
      status: "pending",
      created_at: "2024-01-15"
    },
    {
      id: "2",
      property_address: "456 Oak Ave",
      investor_name: "Jane Doe",
      company_name: "XYZ LLC",
      amount: 180000,
      status: "pending",
      created_at: "2024-01-14"
    }
  ]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateOfferStatus = (id: string, status: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id ? { ...offer, status } : offer
    ));
  };

  const viewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Offer Management</h2>
          <p className="text-gray-600">Review and manage investor offers</p>
        </div>
      </div>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{offer.property_address}</h3>
                  <p className="text-gray-600">Investor: {offer.investor_name}</p>
                  <p className="text-gray-600">Company: {offer.company_name}</p>
                  <p className="text-green-600 font-semibold">${offer.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Submitted: {new Date(offer.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={offer.status === 'approved' ? 'default' : offer.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {offer.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => viewOffer(offer)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {offer.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateOfferStatus(offer.id, 'approved')}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateOfferStatus(offer.id, 'rejected')}>
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Offer Details</DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Property</label>
                <p className="font-semibold">{selectedOffer.property_address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Investor</label>
                <p className="font-semibold">{selectedOffer.investor_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Company</label>
                <p className="font-semibold">{selectedOffer.company_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Offer Amount</label>
                <p className="font-semibold text-green-600">${selectedOffer.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <Badge className="ml-2">{selectedOffer.status}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                <p>{new Date(selectedOffer.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfferManager;