import React, { useState } from 'react';
import { 
  BarChart3, 
  Camera as InstagramIcon, 
  Briefcase as LinkedinIcon, 
  Globe as FacebookIcon, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  LayoutDashboard, 
  Share2,
  Bell,
  Search,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  Download
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SOCIAL_STATS, CHART_DATA, PLATFORMS } from './mockData';
import { twMerge } from 'tailwind-merge';

const StatCard = ({ label, value, trend, Icon }) => (
  <div className="glass-card flex flex-col gap-4 group cursor-default">
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-2xl bg-white/[0.03] text-secondary group-hover:bg-white/[0.08] group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
        <TrendingUp size={10} />
        +{trend}%
      </div>
    </div>
    <div>
      <p className="text-secondary text-xs font-bold uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

const PlatformSection = ({ platform }) => (
  <div className="glass-card space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{ backgroundColor: platform.color }}
        >
          {platform.name === 'Instagram' ? <InstagramIcon size={24} /> : platform.name === 'LinkedIn' ? <LinkedinIcon size={24} /> : <FacebookIcon size={24} />}
        </div>
        <div>
          <h3 className="text-xl font-bold">{platform.name}</h3>
          <p className="text-secondary text-xs">{platform.followers} Followers</p>
        </div>
      </div>
      <button className="p-2 text-secondary hover:text-white"><MoreHorizontal size={20} /></button>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
        <p className="text-[10px] font-bold text-secondary uppercase">Engagement</p>
        <p className="text-lg font-bold">{platform.engagement}</p>
      </div>
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
        <p className="text-[10px] font-bold text-secondary uppercase">Reach</p>
        <p className="text-lg font-bold">{platform.reach}</p>
      </div>
    </div>

    <div className="space-y-4 pt-4 border-t border-white/[0.05]">
      <p className="text-xs font-bold text-secondary uppercase">Recent Posts</p>
      {platform.posts.map((post, i) => (
        <div key={i} className="flex justify-between items-center group cursor-pointer">
          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-1 group-hover:text-white transition-colors">{post.title}</p>
            <p className="text-[10px] text-secondary">{post.date} • {post.type}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
            {post.eng}
            <ArrowUpRight size={14} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

import SmartIngest from './components/SmartIngest';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [syncHistory, setSyncHistory] = useState(() => {
    const saved = localStorage.getItem('socialnexus_history');
    return saved ? JSON.parse(saved) : [];
  });

  const handleExport = () => window.print();

  const handleDataUpdate = (newSync) => {
    const updated = [newSync, ...syncHistory];
    setSyncHistory(updated);
    localStorage.setItem('socialnexus_history', JSON.stringify(updated));
  };

  const lastSync = syncHistory[0];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 border-r border-white/[0.05] p-8 flex flex-col gap-10 no-print">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
            <Share2 className="text-white" size={28} />
          </div>
          <span className="text-2xl font-black hidden lg:block tracking-tighter">SOCIALNEXUS</span>
        </div>

        <nav className="flex-1 flex flex-col gap-3">
          {[
            { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
            { id: 'analytics', label: 'Deep Analytics', icon: BarChart3 },
            { id: 'community', label: 'Community', icon: Users },
            { id: 'messages', label: 'Inbox', icon: MessageCircle },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={twMerge(
                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group",
                activeTab === item.id 
                  ? "bg-white/[0.05] text-white border border-white/[0.08]" 
                  : "text-secondary hover:text-white"
              )}
            >
              <item.icon size={22} className={activeTab === item.id ? "text-indigo-400" : "group-hover:scale-110 transition-transform"} />
              <span className="hidden lg:block font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
           <button className="flex items-center gap-4 px-4 py-4 rounded-2xl text-secondary hover:text-white transition-all w-full group">
            <Settings size={22} className="group-hover:rotate-45 transition-transform" />
            <span className="hidden lg:block font-bold">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-24 border-b border-white/[0.05] flex items-center justify-between px-10 sticky top-0 bg-[#0f172a]/80 backdrop-blur-3xl z-30 no-print">
          <div className="flex items-center gap-6 bg-white/[0.03] border border-white/[0.05] px-6 py-3 rounded-2xl w-[500px]">
            <Search className="text-secondary" size={20} />
            <input 
              type="text" 
              placeholder="Search posts, hashtags or competitors..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsIngestOpen(true)}
              className="px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl font-bold text-sm hover:bg-indigo-500/20 transition-all flex items-center gap-2"
            >
              <Share2 size={16} />
              Sync Platform
            </button>
            <button className="p-3 text-secondary hover:text-white transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f172a]" />
            </button>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto animate-fade-in">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Command Center</h1>
              <p className="text-secondary mt-2">
                Aggregated social intelligence 
                {lastSync && (
                  <span className="text-[10px] ml-4 text-indigo-400 italic">
                    (Last synced {lastSync.platform}: {new Date(lastSync.timestamp).toLocaleTimeString()})
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-4 no-print">
              <button 
                onClick={handleExport}
                className="btn-social bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2"
              >
                <Download size={20} />
                Export Intel
              </button>
            </div>
          </div>

          {syncHistory.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mb-8 border border-white/5">
                <Share2 className="text-indigo-400" size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4">No Intel Connected</h2>
              <p className="text-secondary max-w-md mb-8">
                Your command center is offline. Paste your dashboard data from Instagram or LinkedIn to go live.
              </p>
              <button 
                onClick={() => setIsIngestOpen(true)}
                className="btn-social bg-indigo-500 text-white px-10 py-5 text-lg hover:bg-indigo-600 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Sync First Platform
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                {SOCIAL_STATS.map((stat, i) => (
                  <StatCard key={i} {...stat} Icon={stat.label.includes('Reach') ? TrendingUp : stat.label.includes('Engagement') ? BarChart3 : stat.label.includes('Followers') ? Users : MessageCircle} />
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                  <div className="glass-card">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-bold">Total Reach Distribution</h3>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs text-secondary font-bold">
                          <div className="w-3 h-3 rounded-full bg-indigo-500" />
                          Reach
                        </div>
                      </div>
                    </div>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA}>
                          <defs>
                            <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PLATFORMS.slice(0, 2).map((p, i) => (
                       <PlatformSection key={i} platform={p} />
                    ))}
                  </div>
                </div>

                <div className="xl:col-span-1 space-y-8">
                  <PlatformSection platform={PLATFORMS[2]} />
                  
                  <div className="glass-card bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/20">
                    <h3 className="text-xl font-bold mb-4">Pro Insights</h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      Your LinkedIn engagement is up <span className="text-indigo-400 font-bold">4.2%</span> this week. Reels on Instagram are driving <span className="text-indigo-400 font-bold">3x more reach</span> than static posts.
                    </p>
                    <button className="mt-6 w-full py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-all">
                      Full Strategy Audit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <SmartIngest 
        isOpen={isIngestOpen} 
        onClose={() => setIsIngestOpen(false)} 
        onDataUpdate={handleDataUpdate}
      />
    </div>
  );
}

export default App;
