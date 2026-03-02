import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Globe, Lock, BarChart3, Info, Scale, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Whitepaper() {
  const sections = [
    {
      title: "1. Executive Summary",
      icon: Info,
      content: "USUF is a food-reserve-backed digital token designed to represent ownership claims against verified stored food inventory. Each USUF token is redeemable for $1 USD equivalent wholesale value of stored food inventory."
    },
    {
      title: "2. Problem Statement",
      icon: Shield,
      content: "Global food systems face supply chain instability, inflationary volatility, and geopolitical disruptions. USUF addresses the lack of a transparent, blockchain-based, globally accessible food-backed reserve instrument."
    },
    {
      title: "4. Token Overview",
      icon: FileText,
      content: "Name: United Stored Unitized Food | Ticker: USUF | Blockchain: Polygon | Standard: ERC-20 | Backing: 100% Food Reserve | Redemption Floor: $1 USD equivalent."
    },
    {
      title: "5. Reserve Framework",
      icon: Lock,
      content: "100% food-backed at all times with a 102-105% target buffer. Reserves consist of non-perishable staple foods in insured, verified warehouses. No derivatives or algorithmic leverage."
    },
    {
      title: "6. Minting Policy",
      icon: BarChart3,
      content: "Elastic supply model where tokens are minted ONLY when verified food inventory is added. Governance is controlled via a multi-signature treasury (e.g., 2-of-3 signers)."
    },
    {
      title: "7. Redemption Framework",
      icon: Scale,
      content: "Redeemable for physical food pickup, delivery, or warehouse credit. Processing window is 3-10 business days. Minimum thresholds may apply for efficiency."
    },
    {
      title: "8. Initial Allocation",
      icon: Globe,
      content: "Public Sale: 60% | Institutional Reserve: 15% | Operational Treasury: 10% | Infrastructure: 10% | Governance: 5%. All units remain 100% reserve-backed."
    },
    {
      title: "13. Transparency Commitment",
      icon: CheckCircle2,
      content: "Commitment to quarterly reserve statements, supply transparency, and public reporting. Future plans include independent third-party audits and real-time dashboards."
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Institutional Whitepaper
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Version 1.0 | Food-Backed Digital Reserve Instrument
          </p>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-lg">
            <a href="/USUF_Whitepaper.pdf" download="USUF_Institutional_Whitepaper.pdf">
              <Download className="w-5 h-5 mr-2" />
              Download Full PDF
            </a>
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl font-display font-bold">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
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
          className="mt-12 p-8 bg-white border border-primary/20 rounded-3xl text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
            This document outlines the structural evolution of commodity-backed digital finance. 
            USUF aims to become a trusted food-backed reserve instrument in global markets through 
            disciplined management and transparent reporting.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
