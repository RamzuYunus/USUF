import { Link } from "wouter";
import USUFLogo from "@assets/USUF_logo_1772280201289.png";
import { Twitter, Github, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full p-1">
              <img src={USUFLogo} alt="USUF Logo" className="w-full h-auto" />
            </div>
            <span className="font-display font-bold text-xl text-white">USUF</span>
          </div>
          <p className="text-secondary-foreground/70 max-w-sm">
            Asset-Backed Food Reserve Token. Securing agricultural value on the blockchain. 1 USF = 1 KG Basket Food Value.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:text-primary-foreground">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:text-primary-foreground">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors hover:text-primary-foreground">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-lg text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/sale" className="text-secondary-foreground/70 hover:text-primary transition-colors">Token Sale</Link></li>
            <li><a href="#about" className="text-secondary-foreground/70 hover:text-primary transition-colors">About USUF</a></li>
            <li><a href="#roadmap" className="text-secondary-foreground/70 hover:text-primary transition-colors">Roadmap</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-lg text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">Smart Contract Audit</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-sm text-secondary-foreground/50">
        &copy; {new Date().getFullYear()} USUF Food Reserve. All rights reserved.
      </div>
    </footer>
  );
}
