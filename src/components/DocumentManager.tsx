import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Download, FileText, Shield, Users, Building } from "lucide-react";

interface Document {
  id: string;
  client_id: string;
  client_name: string;
  document_type: string;
  document_name: string;
  file_url: string;
  signed_at: string | null;
  status: string;
  created_at: string;
}

const DocumentManager = () => {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      client_id: "client_123",
      client_name: "John Smith",
      document_type: "Terms of Use",
      document_name: "Platform_Terms_of_Use_2024.pdf",
      file_url: "/docs/terms_of_use.pdf",
      signed_at: "2024-01-15T10:30:00Z",
      status: "signed",
      created_at: "2024-01-15T09:00:00Z"
    },
    {
      id: "2",
      client_id: "client_456",
      client_name: "Jane Doe",
      document_type: "Investment Agreement",
      document_name: "Investment_Agreement_Property_123.pdf",
      file_url: "/docs/investment_agreement.pdf",
      signed_at: null,
      status: "pending",
      created_at: "2024-01-14T16:20:00Z"
    },
    {
      id: "3",
      client_id: "client_789",
      client_name: "ABC Corp",
      document_type: "NDA",
      document_name: "Non_Disclosure_Agreement.pdf",
      file_url: "/docs/nda.pdf",
      signed_at: "2024-01-14T14:10:00Z",
      status: "signed",
      created_at: "2024-01-14T13:00:00Z"
    },
    {
      id: "4",
      client_id: "client_101",
      client_name: "XYZ LLC",
      document_type: "Property Purchase Contract",
      document_name: "Purchase_Contract_456_Oak_Ave.pdf",
      file_url: "/docs/purchase_contract.pdf",
      signed_at: "2024-01-13T11:45:00Z",
      status: "signed",
      created_at: "2024-01-13T10:00:00Z"
    },
    {
      id: "5",
      client_id: "client_202",
      client_name: "Mike Johnson",
      document_type: "Disclaimer",
      document_name: "Investment_Risk_Disclaimer.pdf",
      file_url: "/docs/disclaimer.pdf",
      signed_at: null,
      status: "pending",
      created_at: "2024-01-12T15:30:00Z"
    }
  ]);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'terms of use':
      case 'disclaimer':
        return <Shield className="h-4 w-4" />;
      case 'investment agreement':
      case 'property purchase contract':
        return <Building className="h-4 w-4" />;
      case 'nda':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const viewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'all' || doc.status === filter;
    const matchesSearch = doc.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Document Management</h2>
        <p className="text-gray-600">Track all signed documents and legal agreements</p>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Documents</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getDocumentIcon(document.document_type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{document.document_name}</h3>
                    <p className="text-gray-600">Client: {document.client_name}</p>
                    <p className="text-sm text-gray-500">{document.document_type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                      <span>Created: {new Date(document.created_at).toLocaleDateString()}</span>
                      {document.signed_at && (
                        <span>Signed: {new Date(document.signed_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={document.status === 'signed' ? 'default' : document.status === 'pending' ? 'secondary' : 'destructive'}>
                    {document.status}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => viewDocument(document)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
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
            <DialogTitle>Document Details</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Document Name</label>
                  <p className="font-semibold">{selectedDocument.document_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Type</label>
                  <p>{selectedDocument.document_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Client</label>
                  <p>{selectedDocument.client_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge>{selectedDocument.status}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Created Date</label>
                  <p>{new Date(selectedDocument.created_at).toLocaleDateString()}</p>
                </div>
                {selectedDocument.signed_at && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Signed Date</label>
                    <p>{new Date(selectedDocument.signed_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">File Path</label>
                <p className="text-sm text-gray-500">{selectedDocument.file_url}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button>
                  View Document
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;