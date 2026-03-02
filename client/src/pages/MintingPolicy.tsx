import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Calculator, AlertTriangle, Lock, Users } from "lucide-react";

export default function MintingPolicy() {
  const sections = [
    {
      title: "I. Mint Authority",
      icon: Users,
      content: "Minting authority is controlled by a multi-signature treasury requiring a minimum of 2-of-3 signers. This governance model is designed for maximum security and transparency, similar in structure to established decentralized protocols like MakerDAO."
    },
    {
      title: "II. Minting Trigger",
      icon: Zap,
      content: "New USUF tokens may be minted ONLY when one of the following occurs: Verified food inventory is added to the reserve, stablecoins are deposited specifically for food procurement, or fiat funds are received for immediate food acquisition."
    },
    {
      title: "III. Minting Formula",
      icon: Calculator,
      content: "Tokens minted = Verified Food Value (USD equivalent). For example, if $500,000 worth of wholesale rice inventory is added, exactly 500,000 USUF tokens are minted. There is no algorithmic expansion or discretionary printing."
    },
    {
      title: "IV. Emergency Controls",
      icon: AlertTriangle,
      content: "The smart contract includes robust safety features: a pause() function to halt operations in case of anomalies, a restricted mint() function, and a burn() function to maintain the 1:1 reserve ratio if inventory is removed."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Shield className="w-4 h-4" />
            Supply Governance
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            USUF Minting Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Controlled Supply Expansion Framework
          </p>
        </motion.div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-2 bg-primary/20 w-full" />
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-secondary text-secondary-foreground rounded-3xl text-center shadow-xl"
        >
          <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold mb-2">Immutable Principles</h3>
          <p className="max-w-2xl mx-auto opacity-80">
            USUF adheres to a strict policy of zero-inflation outside of physical asset expansion. Every token represents a tangible contribution to global food security.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
