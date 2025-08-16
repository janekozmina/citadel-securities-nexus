import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EligibilityCriteria {
  id: string;
  name: string;
  description: string;
  conditions: number;
  status: 'Active' | 'Inactive' | 'Draft';
  lastModified: string;
  createdBy: string;
}

interface Condition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

interface EligibilityCriteriaBuilderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingCriteria?: EligibilityCriteria | null;
}

const ATTRIBUTE_CATEGORIES = {
  'Core Security Parameters': [
    'InstrumentCategory', 'InstrumentType', 'InstrumentCode', 'SecurityIdentifierType',
    'IssueDate', 'MaturityDate', 'CouponType', 'CouponRate', 'CouponFrequency',
    'DayCountConvention', 'SeniorityRank', 'CollateralRank', 'GuaranteeType',
    'CallableFlag', 'PutableFlag', 'ConvertibleFlag', 'PerpetualFlag',
    'MinimumLotSize', 'MinimumIncrement', 'OutstandingAmount', 'ListingStatus',
    'PrimaryExchange', 'DenominationCurrency', 'SettlementCurrency',
    'AccruedInterestMethod', 'RedemptionType', 'SubordinationLevel',
    'AssetBackedFlag', 'CoveredBondFlag', 'StructuredProductType'
  ],
  'Issuer & Credit Parameters': [
    'IssuerID', 'IssuerName', 'IssuerCountry', 'IssuerDomicile', 'IssuerSector',
    'ParentIssuerID', 'UltimateParentCountry', 'InstrumentRating_SP',
    'InstrumentRating_Moody', 'InstrumentRating_Fitch', 'IssuerRating_SP',
    'IssuerRating_Moody', 'IssuerRating_Fitch', 'CompositeRating',
    'DomesticRating', 'RatingFloor', 'RatingDate', 'GuarantorRating',
    'PD', 'LGD'
  ],
  'Temporal Parameters': [
    'TimeFromIssue', 'TimeFromIssueWD', 'TimeToMaturityOpenLeg',
    'TimeToMaturityOpenLegWD', 'TimeToMaturityCloseLeg', 'TimeToMaturityCloseLegWD',
    'TermOfOperation', 'TermOfOperationWD', 'TimeToRedmExDate',
    'TimeToRedmExDateWD', 'TimeToNextCoupon', 'TimeSinceLastCoupon',
    'RemainingLife', 'AgeSinceIssuance', 'HolidayCalendarCode',
    'CouponPaymentSchedule', 'CallScheduleDates', 'PutScheduleDates',
    'FirstCallDate', 'FinalMaturityDate'
  ],
  'Market & Liquidity Parameters': [
    'AverageDailyVolume', 'BidAskSpread', 'PriceVolatility', 'LiquidityScore',
    'MarketCapitalization', 'DV01', 'Duration', 'Convexity', 'YieldToWorst',
    'SpreadDuration'
  ],
  'ESG & Sustainability': [
    'ESGScore_Overall', 'ESGScore_Environmental', 'ESGScore_Social',
    'ESGScore_Governance', 'CarbonIntensity', 'ESGRiskRating', 'GreenBondFlag',
    'SustainabilityLinkedFlag', 'ClimateTransitionScore', 'BiodiversityImpactScore'
  ],
  'Operational & Regulatory': [
    'CouponsDuringOperationAllowed', 'SanctionsStatus', 'CountryRiskTier',
    'SovereignCeiling', 'TaxWithholdingRate', 'RegulatoryTreatment',
    'EligibleForLCR', 'EligibleForNSFR', 'CollateralTier', 'LegalEnforceabilityFlag'
  ]
};

const OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Does not equal' },
  { value: 'greater_than', label: 'Greater than' },
  { value: 'less_than', label: 'Less than' },
  { value: 'greater_equal', label: 'Greater than or equal' },
  { value: 'less_equal', label: 'Less than or equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does not contain' },
  { value: 'starts_with', label: 'Starts with' },
  { value: 'ends_with', label: 'Ends with' },
  { value: 'in', label: 'In' },
  { value: 'not_in', label: 'Not in' },
  { value: 'is_null', label: 'Is null' },
  { value: 'is_not_null', label: 'Is not null' }
];

export const EligibilityCriteriaBuilderDialog = ({
  isOpen,
  onClose,
  editingCriteria
}: EligibilityCriteriaBuilderDialogProps) => {
  const [name, setName] = useState(editingCriteria?.name || '');
  const [description, setDescription] = useState(editingCriteria?.description || '');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [showAttributeSelector, setShowAttributeSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentConditionIndex, setCurrentConditionIndex] = useState<number>(-1);

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      attribute: '',
      operator: '',
      value: '',
      logic: conditions.length > 0 ? 'AND' : undefined
    };
    setConditions([...conditions, newCondition]);
    setCurrentConditionIndex(conditions.length);
    setShowAttributeSelector(true);
  };

  const removeCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const selectAttribute = (attribute: string) => {
    if (currentConditionIndex >= 0) {
      updateCondition(currentConditionIndex, 'attribute', attribute);
      setShowAttributeSelector(false);
      setSelectedCategory('');
      setSearchTerm('');
    }
  };

  const filteredAttributes = selectedCategory
    ? ATTRIBUTE_CATEGORIES[selectedCategory as keyof typeof ATTRIBUTE_CATEGORIES]?.filter(attr =>
        attr.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : [];

  const allAttributes = Object.values(ATTRIBUTE_CATEGORIES).flat().filter(attr =>
    attr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving criteria:', { name, description, conditions });
    onClose();
  };

  if (showAttributeSelector) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAttributeSelector(false)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <DialogTitle>Select Attribute</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search attributes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {!selectedCategory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(ATTRIBUTE_CATEGORIES).map((category) => (
                  <Card
                    key={category}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{category}</CardTitle>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        {ATTRIBUTE_CATEGORIES[category as keyof typeof ATTRIBUTE_CATEGORIES].length} attributes
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="font-medium">{selectedCategory}</h3>
                </div>
                <ScrollArea className="h-96">
                  <div className="grid grid-cols-1 gap-2">
                    {(searchTerm ? allAttributes : filteredAttributes).map((attribute) => (
                      <Button
                        key={attribute}
                        variant="ghost"
                        className="justify-start h-auto p-3"
                        onClick={() => selectAttribute(attribute)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{attribute}</div>
                          {searchTerm && !filteredAttributes.includes(attribute) && (
                            <div className="text-xs text-muted-foreground">
                              {Object.entries(ATTRIBUTE_CATEGORIES).find(([, attrs]) => 
                                attrs.includes(attribute)
                              )?.[0]}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {editingCriteria ? 'Edit Eligibility Criteria' : 'Create New Eligibility Criteria'}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Criteria Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter criteria name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter criteria description"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Conditions</h3>
                <Button onClick={addCondition} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </div>

              {conditions.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No conditions added yet. Click "Add Condition" to start building your criteria.</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {conditions.map((condition, index) => (
                    <Card key={condition.id} className="p-4">
                      <div className="space-y-3">
                        {index > 0 && (
                          <div className="flex items-center gap-2">
                            <Select
                              value={condition.logic}
                              onValueChange={(value) => updateCondition(index, 'logic', value)}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AND">AND</SelectItem>
                                <SelectItem value="OR">OR</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-12 gap-3 items-center">
                          <div className="col-span-4">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => {
                                setCurrentConditionIndex(index);
                                setShowAttributeSelector(true);
                              }}
                            >
                              {condition.attribute || 'Select attribute'}
                            </Button>
                          </div>
                          
                          <div className="col-span-3">
                            <Select
                              value={condition.operator}
                              onValueChange={(value) => updateCondition(index, 'operator', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                {OPERATORS.map((op) => (
                                  <SelectItem key={op.value} value={op.value}>
                                    {op.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="col-span-4">
                            <Input
                              value={condition.value}
                              onChange={(e) => updateCondition(index, 'value', e.target.value)}
                              placeholder="Enter value"
                            />
                          </div>
                          
                          <div className="col-span-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCondition(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingCriteria ? 'Update' : 'Create'} Criteria
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};