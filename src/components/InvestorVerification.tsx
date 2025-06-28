import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle } from "lucide-react";

interface VerificationData {
  companyName: string;
  representativeName: string;
  representativeTitle: string;
  address: string;
  idPicture: File | null;
}

const InvestorVerification = ({ onVerificationComplete }: { onVerificationComplete: () => void }) => {
  const [formData, setFormData] = useState<VerificationData>({
    companyName: "",
    representativeName: "",
    representativeTitle: "",
    address: "",
    idPicture: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof VerificationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, idPicture: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onVerificationComplete();
  };

  const isFormValid = formData.companyName && formData.representativeName && 
                     formData.representativeTitle && formData.address && formData.idPicture;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <span>Investor Verification Required</span>
        </CardTitle>
        <CardDescription>
          Please complete the verification process before submitting offers. All information will be reviewed by our admin team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="representativeName">Representative Name *</Label>
              <Input
                id="representativeName"
                value={formData.representativeName}
                onChange={(e) => handleInputChange('representativeName', e.target.value)}
                placeholder="Enter representative name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="representativeTitle">Representative Title *</Label>
            <Input
              id="representativeTitle"
              value={formData.representativeTitle}
              onChange={(e) => handleInputChange('representativeTitle', e.target.value)}
              placeholder="e.g., CEO, Investment Manager"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Company Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete company address"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idPicture">ID Picture Submission *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="idPicture"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                required
              />
              <label htmlFor="idPicture" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {formData.idPicture ? formData.idPicture.name : "Click to upload ID picture"}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting for Review..." : "Submit for Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvestorVerification;