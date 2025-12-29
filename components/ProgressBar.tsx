
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../translations';

interface ProgressBarProps {
  current: number;
  total: number;
  lang: Language;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, lang }) => {
  const t = UI_STRINGS[lang];
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-mono text-cyan-500/70 tracking-tighter uppercase">{t.syncLabel}</span>
        <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}% {t.completeLabel}</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-[1px]">
        <div 
          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 px-1">
        <span className="text-[10px] font-mono text-slate-600 uppercase">{t.inputLabel} {current}</span>
        <span className="text-[10px] font-mono text-slate-600 uppercase">{t.targetLabel} {total}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
