
import React, { useState, useEffect } from 'react';

interface QuizViewProps {
  onFinish: () => void;
  mode: 'DUEL' | 'SOLO';
}

const QuizView: React.FC<QuizViewProps> = ({ onFinish, mode }) => {
  const [round, setRound] = useState(5);
  const [score, setScore] = useState(4820);
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 8));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-dark animate-in fade-in duration-700">
      <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 glass-panel">
        <div className="flex items-center gap-4">
          <span className="text-primary font-black text-2xl tracking-tighter">DUEL.AI</span>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Match Round</span>
            <span className="font-bold text-lg text-white">05 <span className="text-slate-500 font-medium text-sm">/ 10</span></span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-12">
          <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div className="h-full bg-primary w-[65%] relative">
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_#2b6cee]"></div>
            </div>
            <div className="h-full bg-rose-500 w-[35%]"></div>
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter">You Leading +1,200</span>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">Opponent</span>
          </div>
        </div>

        <button onClick={onFinish} className="p-2 hover:bg-white/5 rounded-lg text-rose-500">
          <span className="material-icons">exit_to_app</span>
        </button>
      </header>

      <div className="flex-1 grid grid-cols-12 p-6 gap-6 overflow-hidden">
        {/* User Card */}
        <section className="col-span-3">
          <PlayerCard 
            name="Alex Chen" 
            location="PARIS, FR" 
            streak={8} 
            points={score} 
            img="https://picsum.photos/200/200?seed=alex" 
            xpGain="+250 XP"
            primary
          />
        </section>

        {/* Main Challenge */}
        <section className="col-span-6 flex flex-col gap-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-gradient-to-br from-primary to-rose-500 w-14 h-14 rounded-full flex items-center justify-center border-4 border-background-dark shadow-2xl">
              <span className="font-black text-xl text-white italic">VS</span>
            </div>
          </div>

          <div className="flex-1 glass-panel rounded-2xl p-8 flex flex-col items-center justify-center relative border-primary/20">
            <div className="absolute top-8 right-8 w-20 h-20 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-primary leading-none">{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">SEC</span>
              </div>
            </div>

            <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative group">
              <img 
                src="https://picsum.photos/600/600?seed=headphones" 
                alt="Target" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-slate-400 text-sm font-medium mb-1">Identify this object in:</p>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">CHINESE (Simplified)</h1>
              </div>
            </div>

            <div className="flex gap-2 mt-8">
              <button className="px-6 py-2 rounded-full text-xs font-bold border border-white/10 text-slate-400 hover:text-white transition-colors">FRANCE (FR)</button>
              <button className="px-6 py-2 rounded-full text-xs font-bold bg-primary text-background-dark shadow-lg shadow-primary/30">CHINESE (ZH)</button>
              <button className="px-6 py-2 rounded-full text-xs font-bold border border-white/10 text-slate-400 hover:text-white transition-colors">ENGLISH (EN)</button>
            </div>
          </div>

          <div className="h-24 glass-panel rounded-2xl p-4 flex items-center gap-4 border-white/10">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons text-slate-500">translate</span>
              <input 
                className="w-full h-14 bg-white/5 border-2 border-white/10 rounded-xl pl-12 pr-4 text-xl font-bold focus:border-primary focus:ring-0 transition-all outline-none text-white" 
                placeholder="Type the translation here..." 
                type="text"
              />
            </div>
            <button className="h-14 px-8 bg-primary hover:bg-opacity-90 rounded-xl font-black text-background-dark flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
              SUBMIT
              <span className="material-icons">send</span>
            </button>
          </div>
        </section>

        {/* Opponent Card */}
        <section className="col-span-3">
          <PlayerCard 
            name="Elena K." 
            location="BERLIN, DE" 
            streak={1} 
            points={3620} 
            img="https://picsum.photos/200/200?seed=elena" 
            xpGain="-50 XP"
            opponent
          />
        </section>
      </div>
    </div>
  );
};

const PlayerCard = ({ name, location, streak, points, img, xpGain, primary, opponent }: any) => (
  <div className={`glass-panel p-6 rounded-2xl flex flex-col items-center relative overflow-hidden ${primary ? 'border-l-4 border-primary' : 'border-r-4 border-rose-500'}`}>
    <div className={`absolute top-10 ${primary ? 'right-4 bg-primary' : 'left-4 bg-rose-500'} text-background-dark px-2 py-1 rounded-full text-[10px] font-black shadow-lg`}>
      {xpGain}
    </div>
    <div className="relative mb-4">
      <div className={`w-32 h-32 rounded-full border-4 p-1 bg-background-dark overflow-hidden ${primary ? 'border-primary' : 'border-rose-500'}`}>
        <img src={img} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-4 border-background-dark ${primary ? 'bg-primary text-background-dark' : 'bg-rose-500 text-white'}`}>
        <span className="material-icons text-sm">{primary ? 'videocam' : 'videocam_off'}</span>
      </div>
    </div>
    <div className="text-center">
      <h2 className="text-xl font-black text-white">{name}</h2>
      <p className="text-slate-400 text-[10px] flex items-center justify-center gap-1 font-bold uppercase tracking-widest">
        <span className="material-icons text-[12px]">location_on</span> {location}
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4 w-full mt-8">
      <div className="bg-white/5 p-3 rounded-xl text-center border border-white/5">
        <p className="text-[10px] text-slate-500 uppercase font-black">Streak</p>
        <p className={`text-xl font-black ${opponent ? 'text-rose-400' : 'text-primary'}`}>{streak < 10 ? `0${streak}` : streak}{primary && '🔥'}</p>
      </div>
      <div className="bg-white/5 p-3 rounded-xl text-center border border-white/5">
        <p className="text-[10px] text-slate-500 uppercase font-black">Points</p>
        <p className="text-xl font-black text-white">{points.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

export default QuizView;
