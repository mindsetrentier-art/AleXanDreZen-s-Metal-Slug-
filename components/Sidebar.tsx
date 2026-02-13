
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: AppView.LOBBY, label: 'Duel Lobby', icon: 'sports_esports' },
    { id: AppView.PRACTICE, label: 'Solo Practice', icon: 'translate' },
    { id: AppView.HISTORY, label: 'History Gallery', icon: 'history' },
    { id: AppView.LEADERBOARD, label: 'Leaderboards', icon: 'leaderboard' },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-background-card/50 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
          <span className="material-icons text-white">camera_enhance</span>
        </div>
        <h1 className="font-bold text-xl tracking-tight">LinguaLens</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <div>
          <h3 className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Main Menu</h3>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                    currentView === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="material-icons text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between px-2 mb-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</h3>
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 mb-1">Incoming Invite</p>
              <p className="text-sm font-semibold mb-2">Jean-Luc invited you to a Duel</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white text-xs py-1.5 rounded-lg font-bold">Accept</button>
                <button className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs py-1.5 rounded-lg">Decline</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
          <img 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-primary" 
            src="https://picsum.photos/100/100?seed=alex" 
          />
          <div>
            <p className="text-sm font-bold">Alex Chen</p>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
