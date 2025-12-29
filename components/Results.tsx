
import React from 'react';
import { RefreshCw, Trophy } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../translations';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  timedOutCount: number;
  onRestart: () => void;
  lang: Language;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, correctCount, incorrectCount, timedOutCount, onRestart, lang }) => {
  const t = UI_STRINGS[lang];
  const percentage = Math.max(0, Math.round((correctCount / totalQuestions) * 100));
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center py-12 px-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 neon-border backdrop-blur-xl">
      <div className="mb-8 flex justify-center">
        <div className="relative p-6 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <Trophy className="w-16 h-16 text-cyan-400" />
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white mb-2">{t.analysisComplete}</h1>
      <p className="text-slate-400 mb-8 font-mono tracking-tighter uppercase text-sm">{t.metricsSynthesized}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
          <div className="text-cyan-400 font-mono text-2xl font-bold">{score}</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">{t.totalScore}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
          <div className="text-emerald-400 font-mono text-2xl font-bold">{correctCount}</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">{t.validated}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
          <div className="text-rose-400 font-mono text-2xl font-bold">{incorrectCount}</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">{t.errors}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
          <div className="text-amber-400 font-mono text-2xl font-bold">{timedOutCount}</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">{t.timeouts}</div>
        </div>
      </div>

      <div className="mb-10 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
        <div className="text-slate-300 text-sm mb-2 uppercase font-mono tracking-widest">{t.accuracy}</div>
        <div className="text-5xl font-bold text-white mb-4">{percentage}%</div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={onRestart}
        className="group relative flex items-center justify-center gap-3 w-full py-5 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
      >
        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        {t.restart}
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>
  );
};

export default Results;
