import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Sale from "@/pages/Sale";
import Admin from "@/pages/Admin";
import ReservePolicy from "@/pages/ReservePolicy";
import MintingPolicy from "@/pages/MintingPolicy";
import Whitepaper from "@/pages/Whitepaper";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sale" component={Sale} />
          <Route path="/admin" component={Admin} />
          <Route path="/reserve-policy" component={ReservePolicy} />
          <Route path="/minting-policy" component={MintingPolicy} />
          <Route path="/whitepaper" component={Whitepaper} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
