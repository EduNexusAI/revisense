import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Badge } from './Badge';

interface ComingSoonProps {
  title: string;
  description: string;
  phase?: string;
}

export const ComingSoon = ({ title, description, phase = 'Phase 2' }: ComingSoonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 text-accent"
      >
        <Rocket size={80} />
      </motion.div>
      <Badge variant="info" className="mb-4">Coming in {phase}</Badge>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
      <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
    </motion.div>
  );
};
