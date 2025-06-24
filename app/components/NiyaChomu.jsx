"use client";

import React, { useEffect, useState } from "react";

import {
  ArrowRight,
  Gift,
  Heart,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const CuteGfProject = () => {
  const [currentActivity, setCurrentActivity] = useState("welcome");
  const [score, setScore] = useState(0);
  const [clickTargets, setClickTargets] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [unlockedReasons, setUnlockedReasons] = useState([]);

  const activities = [
    { id: "welcome", name: "Start", icon: <Heart className="h-4 w-4" /> },
    {
      id: "clicker",
      name: "Heart Collector",
      icon: <Target className="h-4 w-4" />,
    },
    {
      id: "memory",
      name: "Memory Game",
      icon: <Sparkles className="h-4 w-4" />,
    },
    { id: "quiz", name: "Quick Quiz", icon: <Zap className="h-4 w-4" /> },
    { id: "finale", name: "The List", icon: <Trophy className="h-4 w-4" /> },
  ];

  const reasons = [
    "Your laugh makes everything better",
    "You're incredibly smart and thoughtful",
    "You make ordinary moments feel special",
    "Your kindness shows in everything you do",
    "You inspire me to be better",
    "Your creativity amazes me constantly",
    "You have the best taste in everything",
    "You're genuinely one of a kind",
  ];

  const quizQuestions = [
    {
      q: "What's your favorite way to spend a lazy Sunday?",
      options: [
        "All of them because you're there",
        "Netflix",
        "Going out",
        "Sleeping",
      ],
    },
    {
      q: "Pick your ideal superpower:",
      options: [
        "Making you smile instantly",
        "Flying",
        "Invisibility",
        "Time travel",
      ],
    },
    {
      q: "What's the best pizza topping?",
      options: ["Whatever you choose", "Pepperoni", "Margherita", "Hawaiian"],
    },
  ];

  const memoryPairs = ["💕", "✨", "🌸", "🦋", "🌟", "💫", "🎀", "🌺"];

  useEffect(() => {
    if (currentActivity === "memory" && memoryCards.length === 0) {
      const cards = [...memoryPairs, ...memoryPairs]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({ id: index, emoji, flipped: false }));
      setMemoryCards(cards);
    }
  }, [currentActivity, memoryCards.length]);

  const startClickerGame = () => {
    setGameActive(true);
    setScore(0);
    setClickTargets([]);

    const spawnTarget = () => {
      const newTarget = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      };
      setClickTargets((prev) => [...prev, newTarget]);

      setTimeout(() => {
        setClickTargets((prev) => prev.filter((t) => t.id !== newTarget.id));
      }, 2000);
    };

    const interval = setInterval(spawnTarget, 800);

    setTimeout(() => {
      clearInterval(interval);
      setGameActive(false);
      if (score >= 5) {
        setUnlockedReasons((prev) => [...prev, reasons[0], reasons[1]]);
      }
    }, 10000);
  };

  const clickTarget = (targetId) => {
    setScore((prev) => prev + 1);
    setClickTargets((prev) => prev.filter((t) => t.id !== targetId));
  };

  const flipCard = (cardId) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      matchedCards.includes(cardId)
    )
      return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find((c) => c.id === first);
      const secondCard = memoryCards.find((c) => c.id === second);

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);

        if (matchedCards.length + 2 === memoryCards.length) {
          setUnlockedReasons((prev) => [...prev, reasons[2], reasons[3]]);
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    if (answerIndex === 0) {
      setUnlockedReasons((prev) => [...prev, reasons[4 + quizIndex]]);
    }

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setCurrentActivity("finale");
    }
  };

  const renderWelcome = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="mx-auto mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-pink-200">
          <Gift className="h-10 w-10 text-pink-500" />
        </div>
        <h1 className="font-rounded mb-4 text-4xl font-bold text-pink-600">
          Hey Beautiful!
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-lg text-pink-400">
          I made you something special~ Complete the cute games to unlock sweet
          messages! 💕
        </p>
      </div>
      <button
        onClick={() => setCurrentActivity("clicker")}
        className="mx-auto flex transform items-center gap-2 rounded-full bg-pink-300 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-pink-400"
      >
        Let's Play! <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );

  const renderClicker = () => (
    <div className="text-center">
      <h2 className="font-rounded mb-3 text-3xl font-bold text-pink-500">
        Heart Collector
      </h2>
      <p className="mb-6 text-pink-400">
        Catch the floating hearts! Get 5+ to unlock sweet messages~
      </p>

      <div className="mb-6">
        <div className="mb-4 text-2xl font-bold text-pink-500">
          💕 Score: {score}
        </div>
        {!gameActive ? (
          <button
            onClick={startClickerGame}
            className="transform rounded-full bg-pink-300 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-pink-400"
          >
            Start Playing!
          </button>
        ) : (
          <div className="text-pink-400">Catch them all! 🌸</div>
        )}
      </div>

      <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-pink-50">
        {clickTargets.map((target) => (
          <Heart
            key={target.id}
            className="absolute h-8 w-8 animate-bounce cursor-pointer fill-current text-pink-400 transition-all duration-200 hover:text-pink-500"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            onClick={() => clickTarget(target.id)}
          />
        ))}
      </div>

      {score >= 5 && (
        <button
          onClick={() => setCurrentActivity("memory")}
          className="mt-6 transform rounded-full bg-pink-400 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-pink-500"
        >
          Next Game! ✨
        </button>
      )}
    </div>
  );

  const renderMemory = () => (
    <div className="text-center">
      <h2 className="font-rounded mb-3 text-3xl font-bold text-pink-500">
        Memory Match
      </h2>
      <p className="mb-6 text-pink-400">
        Match all the cute pairs to unlock more messages! 🦋
      </p>

      <div className="mx-auto mb-6 grid max-w-sm grid-cols-4 gap-3">
        {memoryCards.map((card) => (
          <div
            key={card.id}
            onClick={() => flipCard(card.id)}
            className="flex h-16 w-16 transform cursor-pointer items-center justify-center rounded-2xl bg-pink-100 transition-all duration-300 hover:scale-105 hover:bg-pink-200"
          >
            {flippedCards.includes(card.id) ||
            matchedCards.includes(card.id) ? (
              <span className="animate-bounce text-2xl">{card.emoji}</span>
            ) : (
              <div className="h-8 w-8 rounded-xl bg-pink-300" />
            )}
          </div>
        ))}
      </div>

      {matchedCards.length === memoryCards.length && memoryCards.length > 0 && (
        <button
          onClick={() => setCurrentActivity("quiz")}
          className="transform rounded-full bg-pink-400 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-pink-500"
        >
          Last Game! 🌟
        </button>
      )}
    </div>
  );

  const renderQuiz = () => (
    <div className="text-center">
      <h2 className="font-rounded mb-4 text-3xl font-bold text-pink-500">
        Cute Quiz
      </h2>
      <p className="mb-8 text-xl font-medium text-pink-500">
        {quizQuestions[quizIndex].q}
      </p>

      <div className="mx-auto max-w-md space-y-3">
        {quizQuestions[quizIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleQuizAnswer(index)}
            className="w-full transform rounded-2xl bg-pink-100 px-6 py-3 font-medium text-pink-600 transition-all duration-300 hover:scale-105 hover:bg-pink-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderFinale = () => (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-pink-200">
        <Trophy className="h-10 w-10 text-pink-500" />
      </div>
      <h2 className="font-rounded mb-8 text-3xl font-bold text-pink-500">
        Why You're Amazing 💕
      </h2>

      <div className="mx-auto mb-8 max-w-md space-y-4">
        {unlockedReasons.map((reason, index) => (
          <div
            key={index}
            className="animate-fadeIn rounded-2xl bg-pink-50 px-6 py-4 font-medium text-pink-600"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {reason} 🌸
          </div>
        ))}
      </div>

      <p className="mb-6 text-pink-400">
        You unlocked {unlockedReasons.length} out of {reasons.length} sweet
        messages! 💖
      </p>

      <button
        onClick={() => {
          setCurrentActivity("welcome");
          setUnlockedReasons([]);
          setScore(0);
          setMemoryCards([]);
          setMatchedCards([]);
          setFlippedCards([]);
          setQuizIndex(0);
        }}
        className="mx-auto flex transform items-center gap-2 rounded-full bg-pink-400 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-pink-500"
      >
        <RotateCcw className="h-4 w-4" /> Play Again! 🎀
      </button>
    </div>
  );

  const renderCurrentActivity = () => {
    switch (currentActivity) {
      case "welcome":
        return renderWelcome();
      case "clicker":
        return renderClicker();
      case "memory":
        return renderMemory();
      case "quiz":
        return renderQuiz();
      case "finale":
        return renderFinale();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="bg-pink-25 min-h-screen p-6">
      {/* Floating decorations */}
      <div className="animate-float fixed top-10 left-10 text-pink-200">🌸</div>
      <div
        className="animate-float fixed top-20 right-16 text-pink-200"
        style={{ animationDelay: "1s" }}
      >
        💕
      </div>
      <div
        className="animate-float fixed bottom-16 left-20 text-pink-200"
        style={{ animationDelay: "2s" }}
      >
        🦋
      </div>
      <div
        className="animate-float fixed right-10 bottom-20 text-pink-200"
        style={{ animationDelay: "0.5s" }}
      >
        ✨
      </div>

      {/* Navigation */}
      <div className="mb-10 flex justify-center">
        <div className="flex gap-1 rounded-full bg-pink-100 p-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                currentActivity === activity.id
                  ? "bg-pink-300 text-white"
                  : "text-pink-400 hover:bg-pink-200 hover:text-pink-500"
              }`}
            >
              {activity.icon}
              <span className="text-sm font-medium">{activity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border-none bg-white p-10">
          {renderCurrentActivity()}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .bg-pink-25 {
          background-color: #fef7f7;
        }
        .font-rounded {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default CuteGfProject;
