import { CATEGORIES, CategoryType } from '../types/news';

interface NavbarProps {
  activeTab: CategoryType;
  onTabChange: (tab: CategoryType) => void;
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 border-b border-[#1f1f1f] backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-[#fafafa] flex items-center gap-2 group cursor-pointer">
              <span>William</span>
              <span className="text-[#ff6b35] relative">
                瞭望台
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff6b35] transition-all duration-300 group-hover:w-full" />
              </span>
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex-1 flex justify-end overflow-hidden">
            <div className="flex items-center gap-1 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onTabChange(cat.id)}
                  className={`relative px-3 py-2 text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    activeTab === cat.id 
                      ? "text-[#ff6b35] bg-[#ff6b35]/10" 
                      : "text-[#888888] hover:text-[#fafafa] hover:bg-[#1a1a1a]"
                  }`}
                >
                  {cat.label}
                  {activeTab === cat.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ff6b35] rounded-full" />
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
