
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onClose: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onClose }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Saved Favorites</h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage your detected vocabulary collection.</p>
        </div>
        <div className="flex items-center gap-4 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input 
              className="w-full bg-white dark:bg-background-card border border-primary/10 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              placeholder="Search by name or language..." 
              type="text"
            />
          </div>
          <button className="flex items-center gap-2 bg-primary text-background-dark font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10">
            <span className="material-icons text-sm">download</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <span className="material-icons text-6xl mb-4 opacity-20">history</span>
          <p className="font-bold">No history yet.</p>
          <p className="text-sm">Start scanning objects in Solo Practice to build your gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const HistoryCard: React.FC<{ item: HistoryItem }> = ({ item }) => (
  <div className="bg-white dark:bg-background-card rounded-2xl overflow-hidden border border-primary/10 group hover:border-primary/40 transition-all shadow-sm">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.data.objectName} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute top-3 right-3">
        <button className="bg-white/90 dark:bg-background-dark/80 p-2 rounded-full text-primary hover:scale-110 transition-transform">
          <span className="material-icons text-lg">favorite</span>
        </button>
      </div>
      <div className="absolute bottom-3 left-3">
        <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold">
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
    <div className="p-5 space-y-4">
      <div className="space-y-3">
        <TranslationGroup lang="French" text={item.data.translations.fr} primary />
        <TranslationGroup lang="Chinese" text={item.data.translations.zh} />
        <TranslationGroup lang="English" text={item.data.translations.en} />
      </div>
    </div>
  </div>
);

const TranslationGroup = ({ lang, text, primary }: { lang: string; text: string; primary?: boolean }) => (
  <div className={`flex items-center justify-between ${!primary ? 'pt-2 border-t border-primary/5' : ''}`}>
    <div className="flex flex-col">
      <span className={`text-[10px] font-bold uppercase tracking-wider ${primary ? 'text-primary' : 'text-slate-500'}`}>{lang}</span>
      <span className="text-lg font-bold tracking-tight">{text}</span>
    </div>
    <button className="text-slate-400 hover:text-primary transition-colors">
      <span className="material-icons">volume_up</span>
    </button>
  </div>
);

export default HistoryView;
