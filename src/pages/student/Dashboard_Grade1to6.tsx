import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Book, Brain, Star } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';

export const Dashboard_Grade1to6 = () => {
  const navigate = useNavigate();
  const games = [
    { name: 'Math Adventure', icon: '🎮', color: 'bg-pink-100' },
    { name: 'Word Wizard', icon: '📚', color: 'bg-purple-100' },
    { name: 'Memory Match', icon: '🧠', color: 'bg-blue-100' },
    { name: 'Shape Builder', icon: '🔷', color: 'bg-green-100' },
  ];

  const homework = [
    { task: 'Count to 100', done: true },
    { task: 'Practice ABC', done: false },
    { task: 'Draw Shapes', done: true },
  ];

  return (
    <PageWrapper>
      <div className="font-child min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 -m-6 p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center mb-8 cursor-pointer hover:opacity-80 transition-smooth"
          onClick={() => navigate('/student/profile')}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Hi There! 👋</h1>
          <p className="text-xl text-slate-700 font-medium">Let's learn and play today!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100/50 border border-yellow-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-12 bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
                <Star className="text-yellow-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">My Stars</h2>
            </div>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400 transition-transform hover:scale-110" size={40} />
              ))}
            </div>
            <p className="text-center mt-4 text-lg font-semibold text-slate-700">You're doing great!</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100/50 border border-blue-200/50 shadow-soft hover:shadow-medium transition-shadow" variant="elevated">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-12 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <Brain className="text-blue-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Mood Meter</h2>
            </div>
            <div className="flex items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-6xl cursor-pointer transition-transform"
              >
                😊
              </motion.div>
            </div>
            <p className="text-center mt-4 text-lg font-semibold text-slate-700">Happy Learner!</p>
          </Card>
        </div>

        <Card className="mb-6 md:mb-8 bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-12 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center flex-shrink-0">
              <Gamepad2 className="text-purple-600 w-4 md:w-6 h-4 md:h-6" />
            </div>
            <span className="break-words">My Learning Games</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
            {games.map((game, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-3 md:p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200 border border-purple-200/50 hover:border-purple-300"
              >
                <div className="text-3xl md:text-5xl mb-2 md:mb-3">{game.icon}</div>
                <p className="text-xs md:text-base font-bold text-slate-900 mb-2 break-words">{game.name}</p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mt-1 md:mt-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 md:px-4 py-1 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-200"
                >
                  Play!
                </motion.div>
              </motion.button>
            ))}
          </div>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-soft" variant="elevated">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-12 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center flex-shrink-0">
                <Book className="text-emerald-600 w-4 md:w-6 h-4 md:h-6" />
            </div>
            <span className="break-words">My Tasks</span>
          </h2>
          <div className="space-y-2 md:space-y-3">
            {homework.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/30 rounded-2xl border border-emerald-200/50 hover:border-emerald-300 transition-all duration-200 group"
              >
                <div className={`w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center text-base md:text-xl font-bold transition-colors flex-shrink-0 ${
                  item.done ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {item.done ? '✓' : '○'}
                </div>
                <p className={`text-sm md:text-lg font-semibold transition-all break-words ${
                  item.done ? 'text-slate-500 line-through' : 'text-slate-800 group-hover:text-slate-900'
                }`}>
                  {item.task}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
