import { useState, useMemo } from "react";
import { useTokenConfig } from "@/hooks/use-token";
import { useCreatePurchase } from "@/hooks/use-purchases";
import { useWallet } from "@/hooks/use-wallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GoldToken from "@assets/gold_token_1772291570860.png";
import { ShieldCheck, Loader2, ArrowRightLeft, CheckCircle2, CreditCard, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Sale() {
  const { data: config, isLoading: isLoadingConfig } = useTokenConfig();
  const { address, isConnected, connect, balance } = useWallet();
  const createPurchase = useCreatePurchase();
  
  const [amount, setAmount] = useState<string>("100");
  const [showSuccess, setShowSuccess] = useState(false);

  // Parse values safely
  const tokenPrice = config ? parseFloat(config.price) : 0;
  const numAmount = parseFloat(amount) || 0;
  const totalCost = (numAmount * tokenPrice).toFixed(4);
  const maxAvailable = config ? parseFloat(config.availableSupply) : 0;

  const handleBuy = async () => {
    if (!address) return;
    if (numAmount <= 0) return;
    if (numAmount > maxAvailable) return;

    createPurchase.mutate({
      walletAddress: address,
      amount: numAmount.toString(),
      totalCost: totalCost.toString(),
    }, {
      onSuccess: () => {
        setShowSuccess(true);
        setAmount("100");
      }
    });
  };

  if (isLoadingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 relative flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Join the <span className="text-gradient-gold">USUF Presale</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Secure your stake in the world's first asset-backed food reserve token. Available supply is limited.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium mb-1">Current Price</p>
                <p className="text-3xl font-display font-bold text-foreground">
                  ${tokenPrice.toFixed(2)} <span className="text-base font-normal text-muted-foreground">USDC</span>
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium mb-1">Available Supply</p>
                <p className="text-3xl font-display font-bold text-foreground">
                  {maxAvailable.toLocaleString()} <span className="text-base font-normal text-muted-foreground">USUF</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4">
            <Button asChild variant="outline" className="rounded-full border-2 w-full sm:w-auto">
              <Link href="/whitepaper">Read Whitepaper</Link>
            </Button>
          </div>

          <div className="hidden lg:flex justify-center pt-8">
            <img 
              src={GoldToken} 
              alt="Token" 
              className="w-64 h-64 object-contain opacity-80 mix-blend-multiply"
            />
          </div>
        </motion.div>

        {/* Right Side: Buy Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {config?.externalSaleUrl && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold">Official Sale Platform</span>
                </div>
                <Button variant="link" asChild className="text-primary font-bold">
                  <a href={config.externalSaleUrl} target="_blank" rel="noopener noreferrer">
                    Visit Official Sale
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="glass-card border-t-4 border-t-primary">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-display">Purchase Tokens</CardTitle>
              <CardDescription>Enter amount of USUF you wish to buy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {!isConnected ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">Wallet Not Connected</h3>
                  <p className="text-sm text-muted-foreground mb-4">Connect your Web3 wallet to participate in the token sale.</p>
                  <Button onClick={connect} className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center px-4 py-3 bg-muted/50 rounded-xl border border-border">
                    <span className="text-sm text-muted-foreground">Wallet Balance</span>
                    <span className="font-semibold">{parseFloat(balance).toFixed(4)} ETH</span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount to Buy (USUF)</Label>
                      <div className="relative">
                        <Input 
                          id="amount"
                          type="number" 
                          min="1"
                          max={maxAvailable}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="h-14 text-xl pl-4 pr-16 bg-white border-2 focus-visible:ring-primary/20"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                          USUF
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center py-2">
                      <ArrowRightLeft className="text-muted-foreground w-5 h-5 rotate-90" />
                    </div>

                    <div className="space-y-2">
                      <Label>Total Cost</Label>
                      <div className="h-14 flex items-center justify-between px-4 bg-secondary/5 border border-secondary/10 rounded-xl">
                        <span className="text-2xl font-bold font-display text-secondary">{totalCost}</span>
                        <span className="font-bold text-secondary/60">USDC</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold shadow-lg bg-gradient-to-r from-primary to-[#FCD34D] hover:opacity-90 transition-opacity text-primary-foreground"
                    onClick={handleBuy}
                    disabled={createPurchase.isPending || numAmount <= 0 || numAmount > maxAvailable}
                  >
                    {createPurchase.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Complete Purchase"
                    )}
                  </Button>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-muted-foreground mb-4">Or pay with PayPal / Credit Card</p>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold"
                      onClick={() => window.open('https://www.paypal.com/checkoutnow', '_blank')}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay with PayPal
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-display text-center">Purchase Successful!</DialogTitle>
            <DialogDescription className="text-center text-base">
              You have successfully purchased tokens. They have been added to your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Button onClick={() => setShowSuccess(false)} className="w-full font-bold">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
