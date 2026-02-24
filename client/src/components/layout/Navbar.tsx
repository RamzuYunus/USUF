import { Link, useLocation } from "wouter";
import { useWallet } from "@/hooks/use-wallet";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, ShieldCheck } from "lucide-react";
import USUFLogo from "@assets/USUF_logo_1771929546171.png";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { address, connect, disconnect, isConnected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Token Sale", href: "/sale" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-xl dark:bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-1 group-hover:shadow-md transition-all">
            <img src={USUFLogo} alt="USUF Logo" className="w-full h-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none text-foreground tracking-tight">USUF</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Food Reserve</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isConnected ? (
            <Button 
              variant="outline" 
              onClick={disconnect}
              className="border-primary/20 hover:bg-primary/5 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
              {address?.substring(0, 6)}...{address?.substring(38)}
            </Button>
          ) : (
            <Button 
              onClick={connect}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold px-6 rounded-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-16">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold px-4 py-2 rounded-lg ${
                      location === link.href ? "bg-primary/10 text-primary" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pb-8">
                {isConnected ? (
                  <Button variant="outline" className="w-full" onClick={() => { disconnect(); setIsOpen(false); }}>
                    Disconnect ({address?.substring(0, 6)}...)
                  </Button>
                ) : (
                  <Button className="w-full bg-primary" onClick={() => { connect(); setIsOpen(false); }}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
