import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const SELLING_REASONS = {
  'Financial Hardships': ['Retiring', 'Job Loss', 'Missed Payments', 'Back Taxes', 'Low Equity', 'Bankruptcy', 'High Liens'],
  'Legal Complications': ['Judgments', 'Probate', 'Code Violations', 'Title Issues', 'Deed Fraud', 'Liens', 'Problem Tenants', 'Pre-Foreclosure', 'Inherited Property', 'Squatters'],
  'Property Condition': ['Structural Damage', 'Fire Damage', 'Condemned Properties', 'Large Repairs'],
  'Personal & Life Events': ['Relocations', 'Divorces', 'Illness', 'Disability', 'Hoarders']
};

interface SellingReasonsProps {
  sellingReasons: string[];
  onReasonChange: (reason: string, checked: boolean) => void;
  isSubmitting: boolean;
}

const SellingReasons: React.FC<SellingReasonsProps> = ({ sellingReasons, onReasonChange, isSubmitting }) => {
  return (
    <div>
      <Label className="text-base font-semibold mb-4 block">Reason for Selling (Select all that apply)</Label>
      <div className="space-y-4">
        {Object.entries(SELLING_REASONS).map(([category, reasons]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {reasons.map(reason => (
                <div key={reason} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason}
                    checked={sellingReasons.includes(reason)}
                    onCheckedChange={(checked) => onReasonChange(reason, checked as boolean)}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={reason} className="text-sm">{reason}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellingReasons;