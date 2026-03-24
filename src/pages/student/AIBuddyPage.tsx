import { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Brain, Send, Bot, User, Lightbulb, BookOpen, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SAMPLE_TOPICS = [
  { icon: '📚', title: 'Chapter Explanation', description: 'Get detailed explanation of any topic' },
  { icon: '❓', title: 'Solve Questions', description: 'Step-by-step solutions to problems' },
  { icon: '🎯', title: 'Exam Prep', description: 'Prepare for upcoming exams' },
  { icon: '💡', title: 'Concept Clarity', description: 'Clear confusing concepts' },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Hi! 👋 I\'m your AI Study Buddy. I\'m here to help you with your studies, clarify concepts, solve problems, and prepare for exams. What would you like help with today?',
    timestamp: new Date(),
  },
];

export const AIBuddyPage = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        quadratic: 'A quadratic equation is a polynomial equation of the second degree. It has the form ax² + bx + c = 0, where a ≠ 0. You can solve it using:\n\n1. Factorization\n2. Completing the square\n3. Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a\n\nWould you like me to solve a specific quadratic equation?',
        photosynthesis: 'Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in two stages:\n\n**Light Reactions (in thylakoids):**\n- Absorbs light energy\n- Produces ATP and NADPH\n- Releases oxygen\n\n**Dark Reactions/Calvin Cycle (in stroma):**\n- Uses ATP and NADPH\n- Produces glucose\n\nThe overall equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nNeed more details?',
        default: 'That\'s a great question! Let me help you understand this better. Could you provide more specific details about what you\'re struggling with? For example:\n\n- Are you working on a specific chapter or topic?\n- Do you have a particular problem you\'d like help with?\n- Are you preparing for an upcoming exam?\n\nThe more details you provide, the better I can assist you!',
      };

      let response = aiResponses.default;

      if (messageText.toLowerCase().includes('quadratic') || messageText.toLowerCase().includes('equation')) {
        response = aiResponses.quadratic;
      } else if (messageText.toLowerCase().includes('photosynthesis')) {
        response = aiResponses.photosynthesis;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PageWrapper title="AI Study Buddy" icon={<Brain className="w-6 h-6" />}>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Study Buddy</h1>
          <p className="text-sm text-gray-500">Get personalized help with your studies 24/7</p>
        </div>

        {/* Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat */}
          <div className="lg:col-span-2">
            <Card className="flex flex-col h-[600px] bg-gradient-to-br from-purple-50 to-white border-purple-200">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg whitespace-pre-wrap text-sm ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-700" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask your question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading) {
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    variant="premium"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Topics */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <h3 className="font-bold text-gray-900 mb-4">Quick Topics</h3>
              <div className="space-y-3">
                {SAMPLE_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(`Help me with ${topic.title.toLowerCase()}`)}
                    className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <div className="text-xl mb-1">{topic.icon}</div>
                    <p className="font-medium text-sm text-gray-900">{topic.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{topic.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Tips for best results:</h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Ask specific questions about topics</span>
                  </li>
                  <li className="flex gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Share your doubts in detail</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Ask for step-by-step solutions</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">What I can help with</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📖 Concept Clarity</h4>
              <p className="text-sm text-blue-800">Ask me to explain any topic, formula, or concept in simple terms</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">✏️ Problem Solving</h4>
              <p className="text-sm text-green-800">Get step-by-step solutions to homework problems and practice questions</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">🎯 Exam Preparation</h4>
              <p className="text-sm text-purple-800">Get tips, sample questions, and revision guides for your exams</p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};
