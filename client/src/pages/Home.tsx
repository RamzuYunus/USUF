import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import GoldToken from "@assets/gold_token_1771929546171.png";
import { Leaf, Shield, LineChart, Globe, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-primary/10 to-transparent -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-3xl rounded-full mix-blend-multiply -z-10 opacity-70" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/20 blur-3xl rounded-full mix-blend-multiply -z-10 opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-sm font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Public Sale is Live
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                <span className="text-foreground">Asset-Backed</span><br/>
                <span className="text-gradient-gold">Food Reserve</span><br/>
                <span className="text-foreground">Token</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                The world's first cryptocurrency strictly pegged to real-world agricultural assets. <br/>
                <strong className="text-foreground font-semibold">1 USF = 1 KG Basket Food Value</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                  <Link href="/sale">
                    Buy USF Tokens <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full bg-white/50 backdrop-blur-sm border-2 text-lg font-semibold hover:bg-white hover:-translate-y-1 transition-all">
                  <a href="#about">
                    Read Whitepaper
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Floating animation for token */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <img 
                    src={GoldToken} 
                    alt="USF Gold Token" 
                    className="w-full h-auto drop-shadow-2xl filter"
                    style={{ filter: "drop-shadow(0 25px 25px rgba(245, 176, 17, 0.25))" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Why Choose USF Token?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built on transparency and tangible assets, USF bridges the gap between decentralized finance and global food security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Asset-Backed", desc: "100% fully reserved by verified agricultural commodities in our global treasury network." },
              { icon: LineChart, title: "Inflation Resistant", desc: "Tied to real food value, providing a natural hedge against fiat currency devaluation." },
              { icon: Globe, title: "Global Utility", desc: "Instantly transferable worldwide with low fees, empowering borderless trade." },
              { icon: Leaf, title: "Sustainable Yield", desc: "Supporting sustainable farming practices through treasury yield generation." }
            ].map((feature, i) => (
              <Card key={i} className="border-border/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section (Simplified) */}
      <section id="roadmap" className="py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Project Roadmap
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="glass-card bg-white/5 border-white/10 p-8 rounded-2xl">
                <h4 className="text-primary font-bold mb-2">Phase 1</h4>
                <h3 className="text-2xl font-display font-semibold text-white mb-4">Foundation</h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Smart Contract Dev</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Initial Seed Funding</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Private Sale</li>
                </ul>
             </div>
             <div className="glass-card bg-primary/10 border-primary/20 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">CURRENT</div>
                <h4 className="text-primary font-bold mb-2">Phase 2</h4>
                <h3 className="text-2xl font-display font-semibold text-white mb-4">Public Launch</h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Public Token Sale</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> DEX Listing</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Treasury Expansion</li>
                </ul>
             </div>
             <div className="glass-card bg-white/5 border-white/10 p-8 rounded-2xl">
                <h4 className="text-primary font-bold mb-2">Phase 3</h4>
                <h3 className="text-2xl font-display font-semibold text-white mb-4">Ecosystem</h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> CEX Listings</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Staking Platform</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Global Partnerships</li>
                </ul>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
