import { useTokenConfig, useUpdateTokenConfig } from "@/hooks/use-token";
import { usePurchases } from "@/hooks/use-purchases";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTokenConfigSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Coins, DollarSign, Activity } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

// The schema expects strings for numeric types from DB, so we coerce for the form
const formSchema = z.object({
  price: z.coerce.number().min(0.0001, "Price must be positive").transform(String),
  totalSupply: z.coerce.number().min(1, "Supply must be positive").transform(String),
  availableSupply: z.coerce.number().min(0, "Available cannot be negative").transform(String),
  externalSaleUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function Admin() {
  const { data: config, isLoading: isLoadingConfig } = useTokenConfig();
  const { data: purchases = [], isLoading: isLoadingPurchases } = usePurchases();
  const updateConfig = useUpdateTokenConfig();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      totalSupply: "",
      availableSupply: "",
    }
  });

  // Reset form when config loads
  useEffect(() => {
    if (config) {
      form.reset({
        price: config.price,
        totalSupply: config.totalSupply,
        availableSupply: config.availableSupply,
        externalSaleUrl: config.externalSaleUrl || "",
      });
    }
  }, [config, form]);

  const onSubmit = (data: FormValues) => {
    updateConfig.mutate(data);
  };

  if (isLoadingConfig || isLoadingPurchases) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage token parameters and view recent transactions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Current Price</p>
              <h3 className="text-2xl font-bold font-display">${config?.price || '0.00'}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Available Supply</p>
              <h3 className="text-2xl font-bold font-display">{config?.availableSupply || '0'}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Purchases</p>
              <h3 className="text-2xl font-bold font-display">{purchases.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Settings Form */}
        <div className="lg:col-span-1">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Token Configuration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Price (USDC)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Supply</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="availableSupply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Supply</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="externalSaleUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>External Sale URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    disabled={updateConfig.isPending}
                  >
                    {updateConfig.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Save Configuration
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-md h-full">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {purchases.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No purchases recorded yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Date</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead className="text-right">Amount (USF)</TableHead>
                        <TableHead className="text-right">Cost (USDC)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchases.slice().reverse().map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="text-sm">
                            {purchase.createdAt ? format(new Date(purchase.createdAt), "MMM d, yyyy HH:mm") : "-"}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {purchase.walletAddress.substring(0, 6)}...{purchase.walletAddress.substring(38)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            +{parseFloat(purchase.amount).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            ${parseFloat(purchase.totalCost).toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
