import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative w-full mb-8 group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10">
        <Search className="w-5 h-5 transition-transform duration-300 group-focus-within:scale-110" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card/50 border border-border/50 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary text-foreground pl-12 h-14 rounded-lg transition-all duration-300 text-lg md:text-xl font-sans outline-none placeholder:text-muted/50"
      />
    </div>
  );
};

export default SearchBar;
