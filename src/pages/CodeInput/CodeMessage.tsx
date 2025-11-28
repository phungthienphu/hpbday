import AudioPlayer from "./AudioPlayer";
import type { ICodeMessage } from "../../features/memorySlice";
// interface CodeMessage {
//   code: string;
//   message: string;
//   messagesub?: string;
//   emoji: string;
//   url?: string;
// }

const CodeMessage = ({
  onClose,
  unlockedMessage,
}: {
  onClose: () => void;
  unlockedMessage: ICodeMessage | null;
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000] animate-fade-in p-4">
      <div className="bg-[#FFF8DC] border-2 border-[#FFDAB9] max-h-[90vh] max-w-2xl w-full  relative animate-scale-in shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl z-10 transition-colors"
          onClick={onClose}
          aria-label="Đóng"
        >
          ✕
        </button>

        <div className="px-4 md:px-12 py-4 md:py-8 text-center overflow-y-auto h-full">
          <div className="mb-6">
            <p className="text-[#4A4A4A] text-sm md:text-base font-serif italic tracking-wider mb-2">
              Thông điệp đặc biệt
            </p>
          </div>

          {/* Main title - serif bold */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#2C2C2C] mb tracking-tight pb-2">
            THÔNG ĐIỆP <br />
            CHO EM
          </h2>

          {/* Decorative line with dip */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-[#FFDAB9]"></div>
            <div className="mx-4 w-2 h-2 bg-[#FFDAB9] rounded-full"></div>
            <div className="flex-1 h-px bg-[#FFDAB9]"></div>
          </div>

          {/* Message content */}
          <div className="space-y-6 text-[#4A4A4A] mx-2">
            <div className="text-sm text-justify md:text-base leading-relaxed max-h-[40vh] overflow-y-auto">
              {unlockedMessage?.messagemain && (
                <p
                  className="mb-4 text-lg font-serif font-bold mx-auto text-center"
                  dangerouslySetInnerHTML={{
                    __html: unlockedMessage?.messagemain || "",
                  }}
                />
              )}
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: unlockedMessage?.message || "",
                }}
              />
              {unlockedMessage?.messagesub && (
                <p
                  className="text-xs text-justify"
                  dangerouslySetInnerHTML={{
                    __html: unlockedMessage.messagesub,
                  }}
                />
              )}
            </div>
            {/* Image */}

            {/* Close button */}
            {unlockedMessage?.url && (
              <div className="flex items-center w-full">
                <AudioPlayer url={unlockedMessage?.url} />
              </div>
            )}
            <div>
              <button
                className="mt-2 bg-[#FFDAB9] hover:bg-[#FFC8A2] text-[#2C2C2C] py-2 px-6 font-serif font-semibold tracking-wider transition-colors duration-300 shadow-md hover:shadow-lg"
                onClick={onClose}
              >
                Đã hiểu rồi
              </button>
              {/* <button
                className="mt-6 bg-[#FFDAB9] hover:bg-[#FFC8A2] text-[#2C2C2C] py-3 px-3 font-serif font-semibold tracking-wider transition-colors duration-300 shadow-md hover:shadow-lg"
                onClick={() => {
                  setIsAudioOpen(true);
                }}
              >
                Nghe Audio
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeMessage;
