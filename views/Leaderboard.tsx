
import React from 'react';

const Leaderboard: React.FC<{ onClose: () => void }> = () => {
  const players = [
    { rank: 1, name: 'Elena Rodriguez', words: 1402, points: 28550, languages: ['🇫🇷', '🇨🇳', '🇬🇧'], lvl: 42, isMe: false },
    { rank: 2, name: 'Marc Debois', words: 984, points: 24100, languages: ['🇫🇷', '🇬🇧'], lvl: 28, isMe: false },
    { rank: 3, name: 'Alex Chen', words: 952, points: 23988, languages: ['🇫🇷', '🇨🇳', '🇬🇧'], lvl: 32, isMe: true },
    { rank: 4, name: 'Sarah Kim', words: 876, points: 21450, languages: ['🇨🇳', '🇬🇧'], lvl: 24, isMe: false },
    { rank: 5, name: 'Thomas Muller', words: 712, points: 18200, languages: ['🇫🇷', '🇬🇧'], lvl: 21, isMe: false },
    { rank: 6, name: 'Li Wei', words: 688, points: 15670, languages: ['🇨🇳'], lvl: 19, isMe: false },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Community Leaderboard</h1>
          <p className="text-slate-500 text-sm">Resets in <span className="text-primary font-bold">3d 14h 22m</span></p>
        </div>
        <div className="flex bg-slate-100 dark:bg-background-card p-1 rounded-xl border border-primary/10 shadow-inner">
          <button className="px-6 py-2 rounded-lg bg-primary text-background-dark text-sm font-black shadow-lg shadow-primary/20 transition-all">Friends</button>
          <button className="px-6 py-2 rounded-lg text-slate-400 text-sm font-bold hover:text-white transition-colors">Global</button>
        </div>
      </div>

      <div className="bg-white dark:bg-background-card/50 rounded-2xl overflow-hidden border border-primary/10 shadow-2xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-primary/5 border-b border-primary/10 text-[11px] font-black uppercase tracking-widest text-slate-400">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Learner</div>
          <div className="col-span-2 text-center">Words</div>
          <div className="col-span-2 text-center">Points</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        
        <div className="divide-y divide-primary/5">
          {players.map((p) => (
            <div 
              key={p.rank} 
              className={`grid grid-cols-12 gap-4 px-6 py-5 items-center transition-all group ${
                p.isMe ? 'bg-primary/10 relative overflow-hidden' : 'hover:bg-primary/5'
              }`}
            >
              {p.isMe && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
              <div className="col-span-1 font-black text-2xl flex items-center gap-1">
                <span className={p.rank <= 3 ? 'text-primary' : 'text-slate-500'}>{p.rank}</span>
                {p.rank === 1 && <span className="material-icons text-amber-400 text-sm">emoji_events</span>}
              </div>
              <div className="col-span-5 flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={`https://picsum.photos/100/100?seed=${p.name}`} 
                    className={`w-12 h-12 rounded-xl border-2 ${p.isMe ? 'border-primary' : 'border-transparent'}`} 
                    alt={p.name} 
                  />
                  {p.rank === 1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background-dark"></div>}
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{p.name} {p.isMe && '(You)'}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black px-1.5 py-0.5 bg-primary/20 text-primary rounded-md">LVL {p.lvl}</span>
                    <div className="flex gap-1 opacity-70">
                      {p.languages.map(l => <span key={l} className="text-xs">{l}</span>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-center font-bold text-slate-700 dark:text-slate-200">{p.words.toLocaleString()}</div>
              <div className="col-span-2 text-center font-black text-primary">{p.points.toLocaleString()}</div>
              <div className="col-span-2 text-right">
                {p.isMe ? (
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Self</span>
                ) : (
                  <button className="px-4 py-1.5 rounded-lg border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all">
                    Challenge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-primary/5 text-center border-t border-primary/10">
          <button className="text-xs font-black text-primary hover:underline underline-offset-4 tracking-widest uppercase">
            View All Friends (32)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
