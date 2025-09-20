import React, { useState} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, type ChartData, type ChartOptions } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import KpiCard from '@/components/cards/kpi-card';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const gmvDataConfig: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'GMV',
      data: [180000, 210000, 240000, 220000, 250000, 280000, 260000, 290000, 310000, 320000, 300000, 330000],
      fill: true,
      borderColor: 'rgb(9,92,39)',
      backgroundColor: 'rgba(9,92,39, 0.2)',
      tension: 0.3,
      pointStyle: false,
    },
  ],
};

const gmvOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: {
      ticks: {
        color: '#475569',
        font: { size: 11 },
        callback: (value) => '₦' + Intl.NumberFormat('en-NG', { notation: 'compact' }).format(Number(value)),
      },
    },
  },
};

const categoryDataConfig: ChartData<'doughnut'> = {
  labels: ['Grains & Staples', 'Proteins', 'Fruits', 'Vegetables'],
  datasets: [
    {
      data: [42, 27, 15, 16],
      backgroundColor: [
        'rgb(9,92,39)',
        'rgb(16,185,129)',
        'rgb(245,158,11)',
        'rgb(56,189,248)',
      ],
      borderColor: ['white'],
      borderWidth: 2,
      hoverOffset: 6,
    },
  ],
};

const categoryOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<string>('monthly');

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDateRange(e.target.value);
    // In a real application, you would fetch new data here based on the selected range.
  };

  return (
    <main className="lg:pl-72">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight">Dashboard</h1>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            A comprehensive overview of your Portion.ng business.
          </p>
          <select
            id="dateRange"
            value={dateRange}
            onChange={handleDateRangeChange}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <KpiCard title="Total GMV" value="₦4.5M" description="3.4% vs last month" />
          <KpiCard title="Total Orders" value="1,245" description="0.6% vs last month" />
          <KpiCard title="Active Users" value="230" description="12.1% vs last month" />
          <KpiCard title="Average Order Value" value="₦4,500" description="0.1% vs last month" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold leading-tight tracking-tight">GMV Trend</h2>
            <div className="mt-4 h-64">
              <Line data={gmvDataConfig} options={gmvOptions} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold leading-tight tracking-tight">Category Split</h2>
            <div className="mt-4 h-64 flex items-center justify-center">
              <Doughnut data={categoryDataConfig} options={categoryOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                        <th className="py-2.5 border-b border-slate-200">Order</th>
                        <th className="py-2.5 border-b border-slate-200">Customer</th>
                        <th className="py-2.5 border-b border-slate-200">Merchant</th>
                        <th className="py-2.5 border-b border-slate-200">Portions</th>
                        <th className="py-2.5 border-b border-slate-200">Total</th>
                        <th className="py-2.5 border-b border-slate-200">Status</th>
                        <th className="py-2.5 border-b border-slate-200"></th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {[1,2,3].map((_, idx) => {
                        return (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="py-3 border-b border-slate-100 font-medium">#PNG-10482</td>
                                <td className="py-3 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&amp;w=64&amp;auto=format&amp;fit=crop" className="w-7 h-7 rounded-md object-cover border border-slate-200" />
                                    <div>
                                    <div className="text-sm font-medium">Adaeze U.</div>
                                    <div className="text-xs text-slate-500">ada@example.com</div>
                                    </div>
                                </div>
                                </td>
                                <td className="py-3 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-green-950/10 text-green-800">
                                    <span className="text-xs font-semibold">J</span>
                                    </div>
                                    Jollof Hub
                                </div>
                                </td>
                                <td className="py-3 border-b border-slate-100">Rice x3, Chicken x2</td>
                                <td className="py-3 border-b border-slate-100 font-medium">₦8,200</td>
                                <td className="py-3 border-b border-slate-100">
                                <span className="px-2 py-1 rounded-md text-xs font-medium bg-[rgba(34,197,94,0.08)] text-[rgb(22,163,74)] border border-[rgba(34,197,94,0.25)]" >
                                    Fulfilled
                                </span>
                                </td>
                                <td className="py-3 border-b border-slate-100 text-right">
                                <button className="px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-xs">Details</button>
                                </td>
                            </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
      </div>
    </main>
  );
}