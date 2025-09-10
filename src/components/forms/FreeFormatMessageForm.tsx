import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import portalConfig from '@/config/portalConfig';

const freeFormatMessageSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  messageType: z.string().min(1, 'Message type is required'),
  priority: z.string().min(1, 'Priority is required'),
  recipient: z.string().min(1, 'Recipient is required'),
  subject: z.string().min(1, 'Subject is required'),
  messageContent: z.string().min(1, 'Message content is required'),
  relatedReference: z.string().optional(),
  urgency: z.string().optional(),
  deliveryTime: z.string().optional(),
});

type FreeFormatMessageFormData = z.infer<typeof freeFormatMessageSchema>;

interface FreeFormatMessageFormProps {
  onSubmit: (data: FreeFormatMessageFormData) => void;
  onCancel: () => void;
}

export function FreeFormatMessageForm({ onSubmit, onCancel }: FreeFormatMessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FreeFormatMessageFormData>({
    resolver: zodResolver(freeFormatMessageSchema),
    defaultValues: {
      reference: `FFM${Date.now().toString().slice(-8)}`,
      messageType: 'GENE',
      priority: 'NORM',
      urgency: 'NORM',
    }
  });

  const handleSubmit = async (data: FreeFormatMessageFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(data);
      toast.success('Free format message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Free Format Message (RTGS)
        </CardTitle>
        <CardDescription>
          Send a free format communication message through the RTGS system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Message Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Message Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference *</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-slate-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select message type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GENE">General Message</SelectItem>
                          <SelectItem value="URGN">Urgent Communication</SelectItem>
                          <SelectItem value="CONF">Confirmation Request</SelectItem>
                          <SelectItem value="QUER">Query Message</SelectItem>
                          <SelectItem value="STAT">Status Update</SelectItem>
                          <SelectItem value="NOTI">Notification</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HIGH">High Priority</SelectItem>
                          <SelectItem value="NORM">Normal Priority</SelectItem>
                          <SelectItem value="LOW">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="URGT">Urgent</SelectItem>
                          <SelectItem value="NORM">Normal</SelectItem>
                          <SelectItem value="DEFR">Deferred</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recipient Information</h3>
              
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Institution *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CBB">Central Bank of Bahrain</SelectItem>
                        {portalConfig.banks.commercial.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="relatedReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Reference (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Related transaction reference" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time (Optional)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Message Content</h3>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Message subject or title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="messageContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Content *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter your message content here..."
                        rows={6}
                        className="min-h-[150px]"
                      />
                    </FormControl>
                    <div className="text-xs text-slate-500 mt-1">
                      Maximum 1000 characters. Current: {field.value?.length || 0}/1000
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Message Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Message Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensure message content is clear and professional</li>
                <li>• Include all relevant reference numbers</li>
                <li>• Use appropriate priority level for urgency</li>
                <li>• Messages are logged and may be audited</li>
              </ul>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}