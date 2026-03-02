import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import GoldToken from "@assets/gold_token_1772291570860.png";
import USUFLogo from "@assets/USUF_logo_1772280201289.png";
import WatermelonField from "@assets/IMG_20260224_161928_1772281049829.jpg";
import CantaloupeField from "@assets/IMG_20260221_162752_1772281049862.jpg";
import { Leaf, Shield, LineChart, Globe, ArrowRight, Heart, Users, Target, Tractor, MapPin } from "lucide-react";
import { usePageContent } from "@/hooks/use-content";
import { HOME_DEFAULT, type HomeContent } from "@/lib/content-defaults";

export default function Home() {
  const { content } = usePageContent<HomeContent>("home", HOME_DEFAULT);
  const c = content;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Focused on Mission */}
      <section className="relative pt-20 pb-32 overflow-hidden">
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
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                {c.hero.badge}
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1]">
                <span className="text-foreground">{c.hero.line1}</span><br/>
                <span className="text-gradient-gold">{c.hero.highlight}</span><br/>
                <span className="text-foreground">{c.hero.line3}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                {c.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                  <a href="#about-usuf">
                    Our Mission <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full bg-white/50 backdrop-blur-sm border-2 text-lg font-semibold hover:bg-white hover:-translate-y-1 transition-all">
                  <Link href="/sale">
                    View USUF Token
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center p-12 border border-white/20 shadow-2xl">
                <img 
                  src={USUFLogo} 
                  alt="USUF Logo" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Deep Dive */}
      <section id="mission-values" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {c.mission.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {c.mission.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, color: "blue" },
              { icon: Leaf, color: "green" },
              { icon: Target, color: "amber" },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">{c.mission.cards[i]?.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {c.mission.cards[i]?.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Operations Section */}
      <section id="operations" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow-sm">
                <Tractor className="w-4 h-4" />
                Active Cultivation
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {c.operations.title}
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {c.operations.intro}
                </p>
                
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Target className="w-6 h-6" />
                    <h4 className="font-bold text-lg">Expansion Roadmap</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {c.operations.expansion}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{c.operations.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                  <img src={WatermelonField} alt="Watermelon cultivation" className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-sm font-semibold text-muted-foreground italic">Watermelon Harvest</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                  <img src={CantaloupeField} alt="Cantaloupe cultivation" className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-sm font-semibold text-muted-foreground italic">Cantaloupe Fields</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Token as a Tool for Mission */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img src={GoldToken} alt="USUF Token" className="w-full max-w-sm mx-auto drop-shadow-2xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {c.token.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {c.token.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">1:1</div>
                  <p className="font-semibold text-foreground">{c.token.ratioLabel}</p>
                </div>
                <p className="text-muted-foreground">
                  {c.token.ecosystemText}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10">
                  <Link href="/sale">Participate in Presale</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-2 px-10">
                  <Link href="/whitepaper">Whitepaper</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About USUF Section */}
      <section id="about-usuf" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                About USUF
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                United Stored Unitized Food (USUF) is an Agricultural Reserve Treasury based in Egypt that produces, stores, and digitally unitizes agricultural commodities into fully-backed tokens representing physical food reserves.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-foreground">The system functions as:</h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "A national food buffer",
                    "A transparent agricultural treasury",
                    "A global trade instrument",
                    "A humanitarian stabilization mechanism"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
                Each digital unit represents verified stored food value, redeemable and audited, ensuring real asset backing.
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold font-display text-foreground">USUF aims to:</h3>
                <ul className="space-y-3">
                  {[
                    "Secure Egypt's and the global food base",
                    "Expand desert agriculture and greening of the desert",
                    "Support African nations via fair trade and humanitarian assistance"
                  ].map((aim, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <Shield className="w-5 h-5 text-primary shrink-0" />
                      <span>{aim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-primary/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Verified Reserves</h4>
                      <p className="text-sm text-muted-foreground">Audited monthly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Sustainable</h4>
                      <p className="text-sm text-muted-foreground">Desert Greening</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Global Impact</h4>
                      <p className="text-sm text-muted-foreground">Humanitarian Aid</p>
                    </div>
                  </div>
                </div>
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
              Why Choose USUF Token?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built on transparency and tangible assets, USUF bridges the gap between decentralized finance and global food security.
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

      {/* Roadmap Section */}
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
