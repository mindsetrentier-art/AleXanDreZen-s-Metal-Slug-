
import React from 'react';
import { UserStats } from '../types';

interface LobbyProps {
  stats: UserStats;
  onStartPractice: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ stats, onStartPractice }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon="emoji_events" 
          label="Global Rank" 
          value={`#${stats.globalRank}`} 
          trend="Up 12 spots since yesterday"
          iconColor="text-primary"
          bgColor="bg-primary/10"
        />
        <StatCard 
          icon="bolt" 
          label="W/L Record" 
          value={stats.winLoss} 
          progress={stats.winRate}
          iconColor="text-orange-500"
          bgColor="bg-orange-100"
        />
        <StatCard 
          icon="videocam" 
          label="Camera Status" 
          value="Ready" 
          statusColor="text-primary"
          iconColor="text-blue-500"
          bgColor="bg-blue-100"
        />
      </section>

      <section className="bg-white dark:bg-background-card/80 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight">Quiz Duel</h2>
            <p className="text-slate-500 dark:text-slate-400">Match with opponents globally and test your object recognition speed.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-300">Target Languages</label>
              <div className="space-y-3">
                <LanguageOption flag="🇫🇷" label="French" active />
                <LanguageOption flag="🇨🇳" label="Chinese" />
                <LanguageOption flag="🇬🇧" label="English" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-300">Difficulty Level</label>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {['Easy', 'Medium', 'Hard'].map((lvl) => (
                    <button 
                      key={lvl}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                        lvl === 'Medium' ? 'bg-white dark:bg-slate-700 shadow-lg text-primary' : 'text-slate-500'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={onStartPractice}
                  className="w-full bg-primary hover:bg-opacity-90 text-background-dark font-black py-5 rounded-xl text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span className="material-icons">search</span>
                  Start Practice
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 italic">
                  Estimated wait time: <span className="font-bold text-slate-500">~15 seconds</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/30 px-8 py-4 flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 dark:border-slate-800">
          <span className="material-icons text-primary">info</span>
          Make sure you're in a well-lit environment for optimal camera recognition.
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<any> = ({ icon, label, value, trend, progress, statusColor, iconColor, bgColor }) => (
  <div className="bg-white dark:bg-background-card/80 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div className={`${bgColor} p-3 rounded-full flex items-center justify-center`}>
        <span className={`material-icons ${iconColor}`}>{icon}</span>
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
        <h4 className={`text-2xl font-bold ${statusColor || ''}`}>{value}</h4>
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-xs text-green-500 font-bold">
        <span className="material-icons text-sm mr-1">trending_up</span>
        {trend}
      </div>
    )}
    {progress !== undefined && (
      <div className="mt-4">
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 text-right font-bold uppercase tracking-widest">Win Rate: {progress}%</p>
      </div>
    )}
    {!trend && progress === undefined && (
      <div className="mt-4 text-xs text-slate-400 font-medium">HD Webcam Active</div>
    )}
  </div>
);

const LanguageOption: React.FC<{ flag: string; label: string; active?: boolean }> = ({ flag, label, active }) => (
  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border-2 ${
    active ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-primary/50'
  }`}>
    <div className="flex items-center gap-3">
      <span className="text-2xl">{flag}</span>
      <span className="font-bold text-slate-700 dark:text-slate-200">{label}</span>
    </div>
    <span className={`material-icons ${active ? 'text-primary' : 'text-slate-200 dark:text-slate-800'}`}>
      {active ? 'check_circle' : 'radio_button_unchecked'}
    </span>
  </button>
);

export default Lobby;
