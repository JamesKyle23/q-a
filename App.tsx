
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Activity, FlaskConical, Atom, RefreshCw, Zap, Globe, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from './data';
import { GameStatus, Language } from './types';
import { UI_STRINGS } from './translations';
import QuizCard from './components/QuizCard';
import ProgressBar from './components/ProgressBar';
import Results from './components/Results';
import Timer from './components/Timer';

const TIMER_LIMIT = 30;

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [status, setStatus] = useState<GameStatus>(GameStatus.START);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timedOutCount, setTimedOutCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = UI_STRINGS[lang];

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(TIMER_LIMIT);
    } else {
      setStatus(GameStatus.FINISHED);
    }
  }, [currentIndex]);

  const handleAnswer = useCallback((answer: string | null) => {
    if (selectedAnswer !== null || status !== GameStatus.PLAYING) return;

    if (answer === null) {
      setTimedOutCount(prev => prev + 1);
      setSelectedAnswer('TIMED_OUT');
    } else {
      setSelectedAnswer(answer);
      const currentQuestion = QUIZ_QUESTIONS[currentIndex];
      const correctAnswer = lang === 'en' ? currentQuestion.answer : currentQuestion.answerZh;
      
      if (answer === correctAnswer) {
        setScore(prev => prev + 1);
        setCorrectCount(prev => prev + 1);
      } else {
        setScore(prev => prev - 1);
        setIncorrectCount(prev => prev + 1);
      }
    }

    setTimeout(() => {
      nextQuestion();
    }, 1200);
  }, [currentIndex, selectedAnswer, status, nextQuestion, lang]);

  const abortQuiz = () => {
    // Show results screen first as requested
    setStatus(GameStatus.FINISHED);
  };

  const backToStart = () => {
    // Return to main screen for next student to choose language
    setStatus(GameStatus.START);
  };

  useEffect(() => {
    if (status === GameStatus.PLAYING && selectedAnswer === null) {
      if (timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else {
        handleAnswer(null);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, status, selectedAnswer, handleAnswer]);

  const startGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setTimedOutCount(0);
    setSelectedAnswer(null);
    setTimeLeft(TIMER_LIMIT);
    setStatus(GameStatus.PLAYING);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full p-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight neon-text">{t.title}</h1>
            <p className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.2em]">{t.subtitle}</p>
          </div>
        </div>

        {status === GameStatus.PLAYING && (
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{t.liveEfficiency}</span>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-lg font-mono text-emerald-400 font-bold">{score >= 0 ? '+' : ''}{score}</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{t.sampleIndex}</span>
              <span className="text-lg font-mono text-white font-bold">{currentIndex + 1} <span className="text-slate-600">/ {QUIZ_QUESTIONS.length}</span></span>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {status === GameStatus.START && (
          <div className="max-w-xl text-center">
            <div className="mb-8 inline-block p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <Atom className="w-20 h-20 text-cyan-400 animate-spin-slow" style={{ animationDuration: '8s' }} />
            </div>
            <h2 className="text-4xl font-bold mb-6">{t.verify}</h2>
            <p className="text-slate-400 mb-10 leading-relaxed text-lg">
              {t.intro}
            </p>

            <div className="mb-12">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                <Globe className="w-3 h-3" /> {t.langSelect}
              </h4>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-6 py-2 rounded-lg font-mono text-xs border-2 transition-all ${lang === 'en' ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  ENGLISH [EN]
                </button>
                <button 
                  onClick={() => setLang('zh')}
                  className={`px-6 py-2 rounded-lg font-mono text-xs border-2 transition-all ${lang === 'zh' ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  中文 [ZH]
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
                <Zap className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">{t.timeLimit}</h4>
                  <p className="text-slate-400 text-xs font-mono">{t.timeDetail}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
                <RefreshCw className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">{t.scoreLogic}</h4>
                  <p className="text-slate-400 text-xs font-mono">{t.scoreDetail}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="group relative px-10 py-5 bg-cyan-500 text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              {t.init}
            </button>
          </div>
        )}

        {status === GameStatus.PLAYING && (
          <div className="w-full flex flex-col items-center">
            <ProgressBar current={currentIndex + 1} total={QUIZ_QUESTIONS.length} lang={lang} />
            <Timer seconds={timeLeft} total={TIMER_LIMIT} lang={lang} />
            <QuizCard 
              question={QUIZ_QUESTIONS[currentIndex]} 
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              correctAnswer={lang === 'en' ? QUIZ_QUESTIONS[currentIndex].answer : QUIZ_QUESTIONS[currentIndex].answerZh}
              lang={lang}
            />
            
            <div className="mt-12 flex flex-col items-center gap-6">
              <button
                onClick={abortQuiz}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-rose-500/30 text-rose-500/70 font-mono text-xs uppercase tracking-widest hover:bg-rose-500/10 hover:border-rose-500 hover:text-rose-500 transition-all active:scale-95"
              >
                <XCircle className="w-4 h-4" />
                {t.abort}
              </button>
              
              <div className="flex items-center gap-4 text-slate-600 font-mono text-[10px] tracking-widest uppercase">
                <Activity className="w-3 h-3" />
                {t.syncActive}
              </div>
            </div>
          </div>
        )}

        {status === GameStatus.FINISHED && (
          <Results 
            score={score}
            totalQuestions={QUIZ_QUESTIONS.length}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            timedOutCount={timedOutCount}
            onRestart={backToStart}
            lang={lang}
          />
        )}
      </main>

      <footer className="relative z-10 w-full p-6 text-center border-t border-slate-900 bg-slate-950/50">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">
          End of Line &copy; 2024 Chem-Systems Core v4.1.2
        </p>
      </footer>
    </div>
  );
}

export default App;
