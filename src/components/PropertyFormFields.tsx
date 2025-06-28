import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface PropertyFormFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  photos: File[];
  setPhotos: (photos: File[]) => void;
  isSubmitting: boolean;
  customState: string;
  setCustomState: (state: string) => void;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const PROPERTY_TYPES = [
  'Single Family Home', 'Duplex', 'Triplex', 'Fourplex', 'Small Apartment Building', 'Large Apartment Building', 'Condo', 'Townhouse', 'Mobile Home', 'Commercial', 'Land', 'Other'
];

const PropertyFormFields: React.FC<PropertyFormFieldsProps> = ({
  formData, setFormData, photos, setPhotos, isSubmitting, customState, setCustomState
}) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos([...photos, ...newFiles].slice(0, 10));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Contact Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Information *</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="John"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Doe"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(555) 123-4567"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Property Address *</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="123 Main Street"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="address2">Address Line 2</Label>
            <Input
              id="address2"
              value={formData.address2}
              onChange={(e) => setFormData(prev => ({ ...prev, address2: e.target.value }))}
              placeholder="Apartment, suite, unit, building, floor, etc."
              disabled={isSubmitting}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="City"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))} disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                  <SelectItem value="custom">Other (Type Below)</SelectItem>
                </SelectContent>
              </Select>
              {formData.state === 'custom' && (
                <Input
                  className="mt-2"
                  value={customState}
                  onChange={(e) => setCustomState(e.target.value)}
                  placeholder="Type your state"
                  required
                  disabled={isSubmitting}
                />
              )}
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="12345"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="propertyType">Type of Property</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))} disabled={isSubmitting}>
            <SelectTrigger>
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="squareFootage">Square Footage</Label>
          <Input
            id="squareFootage"
            type="number"
            value={formData.squareFootage}
            onChange={(e) => setFormData(prev => ({ ...prev, squareFootage: e.target.value }))}
            placeholder="2000"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="beds">Bedrooms</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, beds: value }))} disabled={isSubmitting}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
              <SelectItem value="more">More/Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="baths">Bathrooms</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, baths: value }))} disabled={isSubmitting}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
              <SelectItem value="more">More/Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="garage">Car Garage</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, garage: value }))} disabled={isSubmitting}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4].map(num => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
              <SelectItem value="more">More/Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Property Photos (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <Label htmlFor="photos" className="cursor-pointer text-blue-600 hover:text-blue-500">
              Click to upload photos
            </Label>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB each (max 10 photos)</p>
          </div>
          <Input
            id="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            disabled={isSubmitting}
          />
        </div>
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Property photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyFormFields;