import { Logo } from '@/components/shared';
import { Menu, Bell, Download, Plus, Settings, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle"
              aria-controls="sidebar"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu size={24} />
            </button>
            <div className="text-left">
                <Link to="">
                    <div className="text-base font-semibold tracking-tight" style={{color: "green"}}>Portion.ng</div>
                    <div className="text-[11px] text-slate-500 -mt-0.5">Admin</div>
                </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <i data-lucide="search" className="w-4 h-4 text-slate-400"></i>
            </div>
            <input type="text" placeholder="Search orders, merchants, products..." className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm placeholder:text-slate-400" />
            </div>
          </div>

        <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm">
                <Download size={16} />
                Export
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white transition-colors text-sm shadow-sm bg-green-800">
                <Plus size={16} />
                Add Product
            </button>
            <div className="hidden sm:flex items-center gap-1">
            <button
                id="notifications-toggle"
                aria-controls="notifications-panel"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300 relative"
            >
                <Bell size={24} />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white"></div>
            </button>
            <button className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300">
                <Settings />
            </button>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&amp;w=96&amp;auto=format&amp;fit=crop" alt="Admin Avatar" className="h-9 w-9 rounded-md border border-slate-200 object-cover" />
            </div>
        </div>

          
        </div>

        <div className="lg:hidden pb-3">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} />
                </div>
                <input type="text" placeholder="Search orders, merchants, products..." className="w-full pl-10 pr-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm placeholder:text-slate-400" />
            </div>
        </div>
      </div>
    </header>
  );
}