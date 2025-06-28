import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Edit, Users, Building } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'client' | 'investor';
  company_name?: string;
  address: string;
  verification_status: string;
  preferences?: {
    property_types: string[];
    states: string[];
    counties: string[];
    budget_range: string;
  };
  created_at: string;
}

const ClientManager = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-555-0123",
      type: "investor",
      company_name: "ABC Corp",
      address: "123 Business St, NY",
      verification_status: "verified",
      preferences: {
        property_types: ["Single Family", "Multi Family"],
        states: ["NY", "NJ"],
        counties: ["Manhattan", "Brooklyn"],
        budget_range: "$200k - $500k"
      },
      created_at: "2024-01-10"
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1-555-0124",
      type: "client",
      address: "456 Home Ave, CA",
      verification_status: "pending",
      created_at: "2024-01-12"
    }
  ]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'client' | 'investor'>('all');

  const viewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const updateVerificationStatus = (id: string, status: string) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, verification_status: status } : client
    ));
  };

  const filteredClients = clients.filter(client => 
    filter === 'all' || client.type === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Client Management</h2>
          <p className="text-gray-600">Manage client and investor records</p>
        </div>
        <div className="flex space-x-2">
          <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
            All
          </Button>
          <Button variant={filter === 'client' ? 'default' : 'outline'} onClick={() => setFilter('client')}>
            <Users className="h-4 w-4 mr-2" />
            Clients
          </Button>
          <Button variant={filter === 'investor' ? 'default' : 'outline'} onClick={() => setFilter('investor')}>
            <Building className="h-4 w-4 mr-2" />
            Investors
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <Badge variant={client.type === 'investor' ? 'default' : 'secondary'}>
                      {client.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{client.email}</p>
                  <p className="text-gray-600">{client.phone}</p>
                  {client.company_name && (
                    <p className="text-gray-600">Company: {client.company_name}</p>
                  )}
                  <p className="text-sm text-gray-500">{client.address}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Joined: {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={client.verification_status === 'verified' ? 'default' : client.verification_status === 'rejected' ? 'destructive' : 'secondary'}>
                    {client.verification_status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => viewClient(client)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {client.verification_status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateVerificationStatus(client.id, 'verified')}>
                        Verify
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateVerificationStatus(client.id, 'rejected')}>
                        Reject
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="font-semibold">{selectedClient.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <Badge>{selectedClient.type}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p>{selectedClient.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p>{selectedClient.phone}</p>
                </div>
              </div>
              
              {selectedClient.company_name && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Company</label>
                  <p className="font-semibold">{selectedClient.company_name}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p>{selectedClient.address}</p>
              </div>
              
              {selectedClient.preferences && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Investment Preferences</label>
                  <div className="mt-2 space-y-2">
                    <p><strong>Property Types:</strong> {selectedClient.preferences.property_types.join(', ')}</p>
                    <p><strong>States:</strong> {selectedClient.preferences.states.join(', ')}</p>
                    <p><strong>Counties:</strong> {selectedClient.preferences.counties.join(', ')}</p>
                    <p><strong>Budget Range:</strong> {selectedClient.preferences.budget_range}</p>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-600">Verification Status</label>
                <Badge className="ml-2">{selectedClient.verification_status}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientManager;