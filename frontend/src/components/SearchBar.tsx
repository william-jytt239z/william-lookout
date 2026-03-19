import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full mb-8 group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff6b35] z-10 transition-all duration-300 group-focus-within:scale-110">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#141414] border border-[#2a2a2a] hover:border-[#ff6b35]/30 focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/30 text-[#fafafa] pl-12 pr-4 h-14 rounded-xl transition-all duration-300 text-base md:text-lg font-sans outline-none placeholder:text-[#666666]"
      />
      {/* Glow effect on focus */}
      <div className="absolute inset-0 rounded-xl bg-[#ff6b35]/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default SearchBar;
