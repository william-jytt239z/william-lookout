import React from 'react';
import { CATEGORIES, CategoryType } from '../types/news';

interface NavbarProps {
  activeTab: CategoryType;
  onTabChange: (tab: CategoryType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 border-b border-border/50 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-heading font-bold tracking-tighter text-foreground flex items-center gap-1 group cursor-pointer">
              William <span className="text-primary relative">
                瞭望台
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
            </h1>
          </div>

          <div className="flex-1 flex justify-end overflow-hidden">
            <div className="flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onTabChange(cat.id)}
                  className={`relative px-3 py-2 text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === cat.id 
                      ? "text-primary" 
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                  {activeTab === cat.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
