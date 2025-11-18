import { motion, AnimatePresence } from 'framer-motion';

interface SpeechBubbleProps {
  message: string;
  isVisible: boolean;
}

const SpeechBubble = ({ message, isVisible }: SpeechBubbleProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 pointer-events-none"
        >
          {/* Speech bubble */}
          <div className="relative">
            {/* Main bubble */}
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg border-2 border-gray-800">
              <p className="text-gray-900 font-semibold text-base whitespace-nowrap">
                {message}
              </p>
            </div>

            {/* Tail - đuôi hộp thoại */}
            {/* <div className="absolute -bottom-3 left-8">
           
              <div
                className="w-6 h-6 bg-gray-800 transform rotate-45"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                }}
              />
              <div
                className="absolute top-0 left-0 w-5 h-5 bg-white transform rotate-45"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
                  margin: '1px',
                }}
              />
            </div> */}

            {/* Small decorative lines - nét trang trí */}
            <div className="absolute -right-4 top-2">
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full mb-1.5"></div>
              <div className="w-1 h-1 bg-gray-800 rounded-full ml-2"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechBubble;

