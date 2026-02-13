
import React, { useState } from 'react';
import { AppView, HistoryItem, UserStats } from './types';
import Sidebar from './components/Sidebar';
import Lobby from './views/Lobby';
import CameraView from './views/CameraView';
import QuizView from './views/QuizView';
import HistoryView from './views/HistoryView';
import Leaderboard from './views/Leaderboard';

const INITIAL_STATS: UserStats = {
  globalRank: 1245,
  winLoss: "45 - 12",
  winRate: 79,
  xp: 4820,
  streak: 8,
  level: 32
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOBBY);
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const navigate = (view: AppView) => setCurrentView(view);

  const renderView = () => {
    switch (currentView) {
      case AppView.LOBBY:
        return <Lobby stats={stats} onStartPractice={() => navigate(AppView.PRACTICE)} />;
      case AppView.PRACTICE:
        return <CameraView 
                  onClose={() => navigate(AppView.LOBBY)} 
                  onSaveScan={(item) => setHistory(prev => [item, ...prev])} 
                />;
      case AppView.DUEL:
        return <QuizView onFinish={() => navigate(AppView.LOBBY)} mode="DUEL" />;
      case AppView.HISTORY:
        return <HistoryView history={history} onClose={() => navigate(AppView.LOBBY)} />;
      case AppView.LEADERBOARD:
        return <Leaderboard onClose={() => navigate(AppView.LOBBY)} />;
      default:
        return <Lobby stats={stats} onStartPractice={() => navigate(AppView.PRACTICE)} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onNavigate={navigate} 
      />
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
