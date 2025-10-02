import { useAdminHook } from "@/zustand/hooks/admin";

const AdminOrdersPage= () => {
    const { data } = useAdminHook();
    
  return (
    <main className="lg:pl-72">
      {/* Page title and filters */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Orders
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                Review and manage customer orders by status and date.
                </p>
            </div>
            <div className="flex items-center gap-2">
                {/* Date range */}
                <div className="relative">
                <select
                    id="dateRange"
                    className="appearance-none pl-3 pr-8 py-2 rounded-md border border-slate-200 text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                    <option value="7">Last 7 days</option>
                    <option value="30" selected>
                    Last 30 days
                    </option>
                    <option value="90">Last 90 days</option>
                    <option value="365">Last 12 months</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <i data-lucide="chevron-down" className="w-4 h-4 text-slate-500"></i>
                </div>
                </div>
                {/* Status filter */}
                <div className="relative">
                <select
                    id="statusFilter"
                    className="appearance-none pl-3 pr-10 py-2 rounded-md border border-slate-200 text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                    <option value="all">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <i data-lucide="chevron-down" className="w-4 h-4 text-slate-500"></i>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Bulk actions and search */}
        <section className="mb-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-2">
                {/* Custom checkbox */}
                <div className="flex items-center">
                    <input id="selectAll" type="checkbox" className="peer sr-only" />
                    <label
                    htmlFor="selectAll"
                    className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-300 cursor-pointer hover:border-slate-400 transition-colors"
                    >
                    <i
                        data-lucide="check"
                        className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
                    ></i>
                    </label>
                </div>
                <div className="text-sm text-slate-700">
                    <span id="selectedCount">0</span> selected
                </div>
                <div className="hidden sm:flex items-center gap-2">
                    <button className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs hover:bg-slate-50">
                    Mark Fulfilled
                    </button>
                    <button className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs hover:bg-slate-50">
                    Refund
                    </button>
                    <button className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs hover:bg-slate-50">
                    Cancel
                    </button>
                </div>
                </div>
                <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-2.5 flex items-center">
                    <i data-lucide="search" className="w-4 h-4 text-slate-400"></i>
                    </div>
                    <input
                    id="orderSearch"
                    type="text"
                    placeholder="Search order ID, customer, product..."
                    className="w-full pl-8 pr-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm placeholder:text-slate-400"
                    />
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs border border-slate-200 hover:bg-slate-50">
                    <i
                    data-lucide="sliders-horizontal"
                    className="w-4 h-4 text-slate-600"
                    ></i>
                    Advanced
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* Orders Table */}
        <section className="p-4 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold tracking-tight">All Orders</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                Based on Order, User and Product records
                </p>
            </div>
            <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 text-xs">
                Export CSV
                </button>
            </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table overflow-x-auto">
                    <thead className="w-full">
                        <tr className="grid grid-cols-12">
                            <th className="col-span-2">SN</th>
                            <th className="col-span-2">Order</th>
                            <th className="col-span-2">Customer</th>
                            <th className="col-span-2">Product</th>
                            <th className="col-span-2">Portions</th>
                            <th className="col-span-2">Amount</th>

                        </tr>

                    </thead>
                    <tbody>
                        {
                            data.orders.orders.map( (order, idx) => {
                                return (
                                    <tr key={idx} className="grid grid-cols-12">
                                        <td className="col-span-2">{++idx}</td>
                                        <td className="col-span-2">ORDER-{--idx}</td>
                                        <td className="col-span-2">{order.user.firstname}</td>
                                        <td className="col-span-2">{order.product.name}</td>
                                        <td className="col-span-2">{order.product.portion_size}</td>
                                        <td className="col-span-2">{order.amount}</td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            

            {/* dd */}
            {/* <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="py-2.5 border-b border-slate-200 w-12">
                    <div className="flex items-center">
                        <input id="thSelect" type="checkbox" className="peer sr-only" />
                        <label
                        htmlFor="thSelect"
                        className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-300 cursor-pointer hover:border-slate-400 transition-colors"
                        >
                        <i
                            data-lucide="check"
                            className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
                        ></i>
                        </label>
                    </div>
                    </th>
                    <th className="py-2.5 border-b border-slate-200">Order</th>
                    <th className="py-2.5 border-b border-slate-200">Customer</th>
                    <th className="py-2.5 border-b border-slate-200">Product</th>
                    <th className="py-2.5 border-b border-slate-200">Portions</th>
                    <th className="py-2.5 border-b border-slate-200">Amount</th>
                    <th className="py-2.5 border-b border-slate-200">Status</th>
                    <th className="py-2.5 border-b border-slate-200">Created</th>
                    <th className="py-2.5 border-b border-slate-200"></th>
                </tr>
                </thead>
                <tbody id="ordersTbody" className="align-middle">
                { data.orders.orders.map( (order, idx) => {
                    return(
                        <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 border-b border-slate-100">
                    <div className="flex items-center">
                        <input type="checkbox" className="peer rowSelect sr-only" />
                        <label className="inline-flex items-center justify-center w-5 h-5 rounded border border-slate-300 cursor-pointer hover:border-slate-400 transition-colors">
                        <i
                            data-lucide="check"
                            className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100"
                        ></i>
                        </label>
                    </div>
                    </td>
                    <td className="py-3 border-b border-slate-100 font-medium">
                    #ORD-20983
                    </td>
                    <td className="py-3 border-b border-slate-100">{order.user.firstname}</td>
                    <td className="py-3 border-b border-slate-100">{order.product.name} ({order.product.portion_size}{order.product.quantity_unit})</td>
                    <td className="py-3 border-b border-slate-100">{order.portion}</td>
                    <td className="py-3 border-b border-slate-100 font-medium">₦{order.amount}</td>
                    <td className="py-3 border-b border-slate-100">
                    <span className="px-2 py-1 capitalize rounded-md text-xs font-medium bg-green-100 text-green-700 border border-green-300">
                        {order.status}
                    </span>
                    </td>
                    <td className="py-3 border-b border-slate-100">{formatDate(String(order.createdAt), "DD MMM, YY hh:mm A")}</td>
                    <td className="py-3 border-b border-slate-100 text-right">
                    <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs">
                        Details
                    </button>
                    </td>
                </tr>
                    )
                })}
                </tbody>
            </table>
            </div> */}
        </section>
      </section>
    </main>
  );
};

export default AdminOrdersPage;
