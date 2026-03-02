import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Globe, Lock, BarChart3, Info, Scale, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/use-content";
import { WHITEPAPER_DEFAULT, type WhitepaperContent } from "@/lib/content-defaults";

type IconType = React.ElementType;
const ICON_MAP: Record<string, IconType> = {
  Info,
  Shield,
  FileText,
  Lock,
  BarChart3,
  Scale,
  Globe,
  CheckCircle2,
};

export default function Whitepaper() {
  const { content } = usePageContent<WhitepaperContent>("whitepaper", WHITEPAPER_DEFAULT);

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
          {content.sections.map((section, index) => {
            const IconComponent = ICON_MAP[section.icon] ?? FileText;
            return (
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
                      <IconComponent className="w-5 h-5" />
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
            );
          })}
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
