import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isBlogPage = location.pathname === '/blog';

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", isLink: true, onClick: handleHomeClick },
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog", isLink: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          {isBlogPage && (
            <Link to="/" className="mr-2">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <img 
            src="/placeholder.svg" 
            alt="BESD Acquisition" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-primary">BESD Acquisition</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            item.isLink ? (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            )
          ))}
          <Link to="/portal">
            <Button>Client Portal</Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-sm font-medium hover:text-primary transition-colors"
                    onClick={item.onClick || (() => setIsOpen(false))}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <Link to="/portal" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Client Portal</Button>
              </Link>
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Admin</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;