import { X, LayoutDashboard, ShoppingBag,LineChart, Store, Boxes, Users, Wallet, ShieldCheck, Settings2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const overview = [
    {
        url: "",
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Orders",
        icon: <ShoppingBag className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Merchants",
        icon: <Store className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Products",
        icon: <Boxes className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Customers",
        icon: <Users className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    }
]

const finance = [
    
    {
        url: "",
        title: "Payouts",
        icon: <Wallet className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Reports",
        icon: <LineChart className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Moderation",
        icon: <ShieldCheck className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Settings",
        icon: <Settings2 className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
]

const system = [
    {
        url: "",
        title: "Moderation",
        icon: <ShieldCheck className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
    {
        url: "",
        title: "Settings",
        icon: <Settings2 className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" />
    },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        id="sidebar-bg"
        className={`fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm transition-opacity duration-200 ease-in-out lg:invisible ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute right-0 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
          <button id="sidebar-close" className="lg:hidden" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-3">
            <div className="mt-6 mb-3 px-2">
                <div className="text-[11px] uppercase tracking-wide text-slate-500">Overview</div>
            </div>
            <ul className="flex flex-1 flex-col gap-1">
                {overview.map( (item, id)=>{
                    return (
                        <li key={id}>
                            <a
                                href={item.url}
                                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100/60"
                            >
                                <div className="rounded-md p-1.5 group-hover:bg-slate-100">
                                {item.icon}
                                {/* <FileText className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" /> */}
                                </div>
                                <span className="text-slate-700 group-hover:text-slate-900">{item.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
            <div className="mt-6 mb-3 px-2">
                <div className="text-[11px] uppercase tracking-wide text-slate-500">Finance</div>
            </div>
            <ul className="flex flex-1 flex-col gap-1">
                {finance.map( (item, id)=>{
                    return (
                        <li key={id}>
                            <a
                                href={item.url}
                                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100/60"
                            >
                                <div className="rounded-md p-1.5 group-hover:bg-slate-100">
                                {item.icon}
                                {/* <FileText className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" /> */}
                                </div>
                                <span className="text-slate-700 group-hover:text-slate-900">{item.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>

            <div className="mt-6 mb-3 px-2">
                <div className="text-[11px] uppercase tracking-wide text-slate-500">System</div>
            </div>
            <ul className="flex flex-1 flex-col gap-1">
                {system.map( (item, id)=>{
                    return (
                        <li key={id}>
                            <a
                                href={item.url}
                                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100/60"
                            >
                                <div className="rounded-md p-1.5 group-hover:bg-slate-100">
                                {item.icon}
                                {/* <FileText className="h-5 w-5 stroke-2 text-slate-400 group-hover:text-slate-500" /> */}
                                </div>
                                <span className="text-slate-700 group-hover:text-slate-900">{item.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
      </aside>
    </>
  );
}