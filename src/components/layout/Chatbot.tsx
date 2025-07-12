import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chatbot = () => {
  const handleChatbotClick = () => {
    window.open('https://knowledge-hub.fly.dev/', '_blank');
  };

  return (
    <Button
      onClick={handleChatbotClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};

export default Chatbot;