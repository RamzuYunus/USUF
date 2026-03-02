import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, FileText, Database, Lock, Eye, RefreshCcw } from "lucide-react";

export default function ReservePolicy() {
  const sections = [
    {
      title: "I. Purpose",
      icon: FileText,
      content: "The United Stored Unitized Food (USUF) Reserve Policy establishes the asset-backing, valuation, custody, audit, and redemption framework for USUF tokens. USUF represents a claim against stored food inventory valued at $1 USD equivalent per token."
    },
    {
      title: "II. Reserve Composition",
      icon: Database,
      content: "The USUF Reserve consists exclusively of non-perishable staple foods (grains, legumes, oils), properly stored and insured food inventory, and verified warehouse holdings. A stablecoin buffer (≤ 10%) may be used for liquidity management. No speculative assets, unsecured loans, or derivatives are permitted."
    },
    {
      title: "III. Valuation Method",
      icon: Scale,
      content: "Reserve valuation is calculated using average wholesale replacement cost, verified supplier invoices, and regional commodity pricing benchmarks (referencing global commodity indices like the Chicago Board of Trade). Valuation is updated monthly internally and quarterly for public reporting."
    },
    {
      title: "IV. Reserve Ratio",
      icon: ShieldCheck,
      content: "Minimum Reserve Requirement: 100% Food-Backed at all times. Target buffer: 102–105% reserve coverage to absorb pricing fluctuation. If reserves drop below 100%, minting is paused immediately and a public disclosure is issued."
    },
    {
      title: "V. Custody & Storage",
      icon: Lock,
      content: "Food reserves must be stored in approved warehouse facilities with inventory logged via batch tracking, subject to independent inspection, and insured against loss."
    },
    {
      title: "VI. Transparency",
      icon: Eye,
      content: "Public disclosures include: Total USUF in circulation, Total food inventory value, Reserve ratio, and Storage locations (identified regionally)."
    },
    {
      title: "VII. Redemption Policy",
      icon: RefreshCcw,
      content: "1 USUF = $1 equivalent wholesale food value. Redemption options include physical pickup, delivery (fees may apply), or warehouse transfer credit. The redemption processing window is 3–10 business days."
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
            USUF Reserve Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Food-Backed Asset Standard
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
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
          className="mt-16 p-8 bg-white rounded-3xl border border-primary/20 text-center"
        >
          <p className="text-muted-foreground italic">
            This policy ensures the integrity and stability of the USUF ecosystem by maintaining a direct link between digital units and physical food value.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
