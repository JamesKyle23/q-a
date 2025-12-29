
import React from 'react';
import { Question, Language } from '../types';
import { UI_STRINGS } from '../translations';

interface QuizCardProps {
  question: Question;
  onAnswer: (selected: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  lang: Language;
  isHardMode?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer, selectedAnswer, correctAnswer, lang, isHardMode }) => {
  const t = UI_STRINGS[lang];
  const questionText = lang === 'en' ? question.text : question.textZh;
  const options = lang === 'en' ? question.options : question.optionsZh;
  const correctOption = lang === 'en' ? question.answer : question.answerZh;

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 neon-border flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
          {t.inquiry} #{question.id}
        </span>
      </div>
      
      <h2 className="text-2xl font-bold text-white leading-tight">
        {questionText}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = correctOption === option;
          const isWrong = isSelected && selectedAnswer !== correctOption;
          
          let buttonClass = "w-full p-4 rounded-xl font-medium text-left transition-all duration-200 border-2 ";
          
          if (!selectedAnswer) {
            buttonClass += "bg-slate-800/50 border-transparent hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300";
          } else {
            // Hard mode: Do not reveal correctness
            if (isHardMode) {
              buttonClass += isSelected ? "bg-cyan-500/20 border-cyan-500 text-cyan-400" : "bg-slate-800/50 border-transparent text-slate-500 opacity-50";
            } else {
              if (isCorrect) {
                buttonClass += "bg-emerald-500/20 border-emerald-500 text-emerald-400";
              } else if (isWrong) {
                buttonClass += "bg-rose-500/20 border-rose-500 text-rose-400";
              } else {
                buttonClass += "bg-slate-800/50 border-transparent text-slate-500 opacity-50 cursor-not-allowed";
              }
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !selectedAnswer && onAnswer(option)}
              disabled={!!selectedAnswer}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-400 font-mono">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
