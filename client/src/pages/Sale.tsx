import { useState } from "react";
import { Link } from "wouter";
import { useTokenConfig } from "@/hooks/use-token";
import { useCreatePurchase } from "@/hooks/use-purchases";
import { useWallet } from "@/hooks/use-wallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import GoldToken from "@assets/gold_token_1772291570860.png";
import { ShieldCheck, Loader2, ArrowRightLeft, CheckCircle2, CreditCard, ExternalLink, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/use-content";
import { SALE_DEFAULT, type SaleContent } from "@/lib/content-defaults";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ethers } from "ethers";
import { useToast } from "@/hooks/use-toast";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Addresses on Polygon Mainnet
const CONTRACT_ADDRESSES = {
  SALE: "0xa7398E1C50C42bDC848c75fdA5805dD89483e02B",
  USDC: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
};

// Minimal ABIs
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function decimals() public view returns (uint8)"
];

const SALE_ABI = [
  "function buyWithUSDC(uint256 amount) public",
  "function buyWithUSDT(uint256 amount) public"
];

export default function Sale() {
  const { data: config, isLoading: isLoadingConfig } = useTokenConfig();
  const { address, isConnected, connect, balance } = useWallet();
  const createPurchase = useCreatePurchase();
  const { content } = usePageContent<SaleContent>("sale", SALE_DEFAULT);
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<string>("100");
  const [paymentToken, setPaymentToken] = useState<"USDC" | "USDT">("USDC");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>("");

  const tokenPrice = config ? parseFloat(config.price) : 0.1;
  const numAmount = parseFloat(amount) || 0;
  const totalCost = (numAmount * tokenPrice).toFixed(2);
  const maxAvailable = config ? parseFloat(config.availableSupply) : 0;

  const handleBlockchainBuy = async () => {
    if (!window.ethereum || !address) return;
    
    try {
      setIsProcessing(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenAddress = paymentToken === "USDC" ? CONTRACT_ADDRESSES.USDC : CONTRACT_ADDRESSES.USDT;
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const saleContract = new ethers.Contract(CONTRACT_ADDRESSES.SALE, SALE_ABI, signer);

      const decimals = await tokenContract.decimals();
      const costInBaseUnits = ethers.utils.parseUnits(totalCost, decimals);

      const currentAllowance = await tokenContract.allowance(address, CONTRACT_ADDRESSES.SALE);
      
      if (currentAllowance.lt(costInBaseUnits)) {
        toast({ title: "Approving Token", description: `Please approve ${paymentToken} spending...` });
        const approveTx = await tokenContract.approve(CONTRACT_ADDRESSES.SALE, ethers.constants.MaxUint256);
        await approveTx.wait();
        toast({ title: "Approved", description: "Token spending approved successfully." });
      }

      toast({ title: "Processing Purchase", description: "Please confirm the transaction in your wallet..." });
      
      const buyTx = paymentToken === "USDC" 
        ? await saleContract.buyWithUSDC(ethers.utils.parseUnits(amount, 18))
        : await saleContract.buyWithUSDT(ethers.utils.parseUnits(amount, 18));
      
      await buyTx.wait();

      createPurchase.mutate({
        walletAddress: address,
        amount: numAmount.toString(),
        totalCost: totalCost.toString(),
        paymentMethod: "blockchain",
        status: "completed"
      }, {
        onSuccess: () => {
          setShowSuccess(true);
          setAmount("100");
        }
      });

    } catch (error: any) {
      console.error(error);
      toast({
        title: "Purchase Failed",
        description: error.reason || error.message || "Transaction failed",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalSuccess = async (details: any) => {
    try {
      setIsProcessing(true);
      
      // Use wallet address if connected, otherwise generate a placeholder
      const recipientAddr = address || details.payer?.email_address || "paypal-user";
      
      // Call backend to capture and transfer tokens
      const response = await fetch("/api/paypal/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: details.id,
          recipientAddress: recipientAddr,
          usdAmount: totalCost
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Token transfer failed");
      }

      setTransactionHash(result.transactionHash);

      // Record purchase
      createPurchase.mutate({
        walletAddress: recipientAddr,
        amount: numAmount.toString(),
        totalCost: totalCost.toString(),
        paymentMethod: "paypal",
        status: "completed"
      }, {
        onSuccess: () => {
          setShowSuccess(true);
          setAmount("100");
        }
      });

      toast({
        title: "Tokens Transferred",
        description: `Transaction: ${result.transactionHash.slice(0, 10)}...`
      });
    } catch (error: any) {
      console.error("PayPal capture error:", error);
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to transfer tokens",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
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
              Join the <span className="text-gradient-gold">{content.title.replace("Join the ", "")}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium mb-1">Current Price</p>
                <p className="text-3xl font-display font-bold text-foreground">
                  ${tokenPrice.toFixed(2)} <span className="text-base font-normal text-muted-foreground">USD</span>
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
                <Button variant="ghost" asChild className="text-primary font-bold hover:text-primary/80">
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
              <CardDescription>Directly on Polygon Mainnet</CardDescription>
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

                    <div className="space-y-2">
                      <Label>Pay With</Label>
                      <Select value={paymentToken} onValueChange={(v: any) => setPaymentToken(v)}>
                        <SelectTrigger className="h-14 bg-white border-2">
                          <SelectValue placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDC">
                            <div className="flex items-center gap-2">
                              <Coins className="w-4 h-4 text-blue-500" />
                              USDC (Polygon)
                            </div>
                          </SelectItem>
                          <SelectItem value="USDT">
                            <div className="flex items-center gap-2">
                              <Coins className="w-4 h-4 text-green-500" />
                              USDT (Polygon)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-center py-2">
                      <ArrowRightLeft className="text-muted-foreground w-5 h-5 rotate-90" />
                    </div>

                    <div className="space-y-2">
                      <Label>Estimated Total Cost</Label>
                      <div className="h-14 flex items-center justify-between px-4 bg-secondary/5 border border-secondary/10 rounded-xl">
                        <span className="text-2xl font-bold font-display text-secondary">{totalCost}</span>
                        <span className="font-bold text-secondary/60">{paymentToken}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold shadow-lg bg-gradient-to-r from-primary to-[#FCD34D] hover:opacity-90 transition-opacity text-primary-foreground"
                    onClick={handleBlockchainBuy}
                    disabled={isProcessing || numAmount <= 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Transacting...
                      </>
                    ) : (
                      `Buy USUF with ${paymentToken}`
                    )}
                  </Button>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-center text-muted-foreground mb-4">Other payment methods</p>
                    <PayPalScriptProvider 
                      options={{ 
                        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
                        "data-order-id": "test"
                      }}
                    >
                      <PayPalButtons 
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: totalCost,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then(handlePayPalSuccess);
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-display text-center">Purchase Successful!</DialogTitle>
            <DialogDescription className="text-center text-base">
              {numAmount} USUF tokens have been transferred to your address.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            {transactionHash && (
              <div className="bg-muted/50 p-4 rounded-lg text-left">
                <p className="text-xs text-muted-foreground mb-2">Transaction Hash:</p>
                <a
                  href={`https://polygonscan.com/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline break-all flex items-center gap-2"
                  data-testid="transaction-hash-link"
                >
                  {transactionHash.slice(0, 20)}...{transactionHash.slice(-10)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            <Button onClick={() => setShowSuccess(false)} className="w-full font-bold">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
