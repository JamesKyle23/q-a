
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../translations';

interface TimerProps {
  seconds: number;
  total: number;
  lang: Language;
}

const Timer: React.FC<TimerProps> = ({ seconds, total, lang }) => {
  const t = UI_STRINGS[lang];
  const percentage = (seconds / total) * 100;
  const isCritical = seconds <= 5;

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-slate-800"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="282.7"
            strokeDashoffset={282.7 - (282.7 * percentage) / 100}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-linear ${isCritical ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'}`}
          />
        </svg>
        <span className={`text-xl font-mono font-bold ${isCritical ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`}>
          {seconds}
        </span>
      </div>
      <span className="text-[10px] font-mono text-slate-500 uppercase mt-2 tracking-widest">{t.temporalLimit}</span>
    </div>
  );
};

export default Timer;
