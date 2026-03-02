import { useState, useEffect } from "react";
import { useTokenConfig, useUpdateTokenConfig } from "@/hooks/use-token";
import { usePurchases } from "@/hooks/use-purchases";
import { usePageContent, useSetPageContent } from "@/hooks/use-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTokenConfigSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Coins, DollarSign, Activity, Save } from "lucide-react";
import { format } from "date-fns";
import { HOME_DEFAULT, SALE_DEFAULT, WHITEPAPER_DEFAULT, type HomeContent, type SaleContent, type WhitepaperContent } from "@/lib/content-defaults";
import { useToast } from "@/hooks/use-toast";

const tokenFormSchema = z.object({
  price: z.coerce.number().min(0.0001, "Price must be positive").transform(String),
  totalSupply: z.coerce.number().min(1, "Supply must be positive").transform(String),
  availableSupply: z.coerce.number().min(0, "Available cannot be negative").transform(String),
  externalSaleUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type TokenFormValues = z.infer<typeof tokenFormSchema>;

function SectionHeader({ title }: { title: string }) {
  return <h3 className="text-lg font-bold font-display text-foreground border-b border-border pb-2 mb-4">{title}</h3>;
}

function SaveButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
      {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
      Save Changes
    </Button>
  );
}

function HomeContentEditor() {
  const { content, isLoading } = usePageContent<HomeContent>("home", HOME_DEFAULT);
  const setContent = useSetPageContent();
  const { toast } = useToast();
  const [form, setForm] = useState<HomeContent>(HOME_DEFAULT);

  useEffect(() => { setForm(content); }, [content]);

  const update = (path: string, value: string) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateCard = (idx: number, field: "title" | "desc", value: string) => {
    setForm((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next.mission.cards[idx][field] = value;
      return next;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setContent.mutate({ key: "home", value: form }, {
      onSuccess: () => toast({ title: "Home content saved", description: "Changes are live." }),
    });
  };

  if (isLoading) return <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="space-y-4">
        <SectionHeader title="Hero Section" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input value={form.hero.badge} onChange={e => update("hero.badge", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Line 1 (before highlight)</Label>
            <Input value={form.hero.line1} onChange={e => update("hero.line1", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Highlight (gold text)</Label>
            <Input value={form.hero.highlight} onChange={e => update("hero.highlight", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Line 3 (after highlight)</Label>
            <Input value={form.hero.line3} onChange={e => update("hero.line3", e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Hero Description</Label>
          <Textarea rows={3} value={form.hero.description} onChange={e => update("hero.description", e.target.value)} />
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Mission Section" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input value={form.mission.title} onChange={e => update("mission.title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input value={form.mission.subtitle} onChange={e => update("mission.subtitle", e.target.value)} />
          </div>
        </div>
        {form.mission.cards.map((card, i) => (
          <div key={i} className="p-4 bg-muted/30 rounded-xl space-y-3">
            <p className="font-semibold text-sm text-muted-foreground">Card {i + 1}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={card.title} onChange={e => updateCard(i, "title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={2} value={card.desc} onChange={e => updateCard(i, "desc", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <SectionHeader title="Operations Section" />
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input value={form.operations.title} onChange={e => update("operations.title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Intro Paragraph</Label>
          <Textarea rows={3} value={form.operations.intro} onChange={e => update("operations.intro", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Expansion Paragraph</Label>
          <Textarea rows={3} value={form.operations.expansion} onChange={e => update("operations.expansion", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Location Label</Label>
          <Input value={form.operations.location} onChange={e => update("operations.location", e.target.value)} />
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Token Section" />
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input value={form.token.title} onChange={e => update("token.title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea rows={2} value={form.token.description} onChange={e => update("token.description", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Ratio Label (1:1 box)</Label>
          <Input value={form.token.ratioLabel} onChange={e => update("token.ratioLabel", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Ecosystem Text</Label>
          <Textarea rows={2} value={form.token.ecosystemText} onChange={e => update("token.ecosystemText", e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton isPending={setContent.isPending} />
      </div>
    </form>
  );
}

function SaleContentEditor() {
  const { content, isLoading } = usePageContent<SaleContent>("sale", SALE_DEFAULT);
  const setContent = useSetPageContent();
  const { toast } = useToast();
  const [form, setForm] = useState<SaleContent>(SALE_DEFAULT);

  useEffect(() => { setForm(content); }, [content]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setContent.mutate({ key: "sale", value: form }, {
      onSuccess: () => toast({ title: "Sale page content saved", description: "Changes are live." }),
    });
  };

  if (isLoading) return <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-2">
        <Label>Page Title</Label>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label>Subtitle / Description</Label>
        <Textarea rows={3} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} />
      </div>
      <div className="flex justify-end">
        <SaveButton isPending={setContent.isPending} />
      </div>
    </form>
  );
}

function WhitepaperContentEditor() {
  const { content, isLoading } = usePageContent<WhitepaperContent>("whitepaper", WHITEPAPER_DEFAULT);
  const setContent = useSetPageContent();
  const { toast } = useToast();
  const [sections, setSections] = useState(WHITEPAPER_DEFAULT.sections);

  useEffect(() => { setSections(content.sections); }, [content]);

  const updateSection = (idx: number, field: "title" | "content", value: string) => {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setContent.mutate({ key: "whitepaper", value: { sections } }, {
      onSuccess: () => toast({ title: "Whitepaper content saved", description: "Changes are live." }),
    });
  };

  if (isLoading) return <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {sections.map((section, i) => (
        <div key={i} className="p-4 bg-muted/30 rounded-xl space-y-3">
          <p className="font-semibold text-sm text-muted-foreground">Section {i + 1}</p>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={section.title} onChange={e => updateSection(i, "title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea rows={3} value={section.content} onChange={e => updateSection(i, "content", e.target.value)} />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <SaveButton isPending={setContent.isPending} />
      </div>
    </form>
  );
}

export default function Admin() {
  const { data: config, isLoading: isLoadingConfig } = useTokenConfig();
  const { data: purchases = [], isLoading: isLoadingPurchases } = usePurchases();
  const updateConfig = useUpdateTokenConfig();

  const form = useForm<TokenFormValues>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: { price: "", totalSupply: "", availableSupply: "" }
  });

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

  const onSubmit = (data: TokenFormValues) => { updateConfig.mutate(data); };

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
        <p className="text-muted-foreground mt-2">Manage token parameters, page content, and transactions.</p>
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

      <Tabs defaultValue="token" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1 bg-muted p-1 rounded-xl">
          <TabsTrigger value="token" className="rounded-lg">Token Config</TabsTrigger>
          <TabsTrigger value="home" className="rounded-lg">Home Content</TabsTrigger>
          <TabsTrigger value="sale" className="rounded-lg">Sale Page</TabsTrigger>
          <TabsTrigger value="whitepaper" className="rounded-lg">Whitepaper</TabsTrigger>
          <TabsTrigger value="purchases" className="rounded-lg">Purchases</TabsTrigger>
        </TabsList>

        {/* Token Config Tab */}
        <TabsContent value="token">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Token Configuration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Price (USDC)</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="totalSupply" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Supply</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="availableSupply" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Supply</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="externalSaleUrl" render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Sale URL</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={updateConfig.isPending}>
                    {updateConfig.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Configuration
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Home Content Tab */}
        <TabsContent value="home">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Home Page Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <HomeContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sale Page Tab */}
        <TabsContent value="sale">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Token Sale Page Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 max-w-2xl">
              <SaleContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Whitepaper Tab */}
        <TabsContent value="whitepaper">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-muted/30 border-b border-border pb-4">
              <CardTitle className="text-lg">Whitepaper Sections</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <WhitepaperContentEditor />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases">
          <Card className="border-border shadow-md">
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
                        <TableHead className="text-right">Amount (USUF)</TableHead>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
