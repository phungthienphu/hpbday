import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Memory {
  id: number;
  image: string;
  description: string;
  date: string;
}

interface CodeMessage {
  code: string;
  message: string;
  emoji: string;
}

interface MemoryState {
  memories: Memory[];
  codeMessages: CodeMessage[];
  unlockedMessage: CodeMessage | null;
}

const initialState: MemoryState = {
  memories: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500',
      description: 'Ngày đầu tiên gặp nhau, em nhớ mãi khoảnh khắc ấy 💕',
      date: '14/02/2023',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500',
      description: 'Chuyến đi biển đầu tiên cùng nhau, sóng và gió không thể chia cắt đôi ta 🌊',
      date: '05/05/2023',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500',
      description: 'Sinh nhật anh, em đã chuẩn bị rất kỹ lưỡng 🎂',
      date: '18/08/2023',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500',
      description: 'Buổi tối romantic nhất trong đời, dưới ánh trăng và ngôi sao 🌙✨',
      date: '12/10/2023',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
      description: 'Chuyến picnic cuối tuần, chỉ có đôi ta và thiên nhiên 🌳',
      date: '03/12/2023',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500',
      description: 'Giáng sinh cùng nhau, ấm áp bên anh 🎄❤️',
      date: '25/12/2023',
    },
  ],
  codeMessages: [
    {
      code: 'LOVE143',
      message: 'Anh yêu em! 143 = I Love You (số chữ cái trong mỗi từ) 💖',
      emoji: '💖',
    },
    {
      code: 'FOREVER',
      message: 'Mãi mãi bên nhau, không bao giờ rời xa em 💍',
      emoji: '💍',
    },
    {
      code: 'SUNSHINE',
      message: 'Em là ánh nắng trong cuộc đời anh ☀️',
      emoji: '☀️',
    },
    {
      code: 'ANGEL',
      message: 'Thiên thần của anh, người duy nhất trong trái tim anh 👼',
      emoji: '👼',
    },
    {
      code: 'DREAM',
      message: 'Em là giấc mơ đẹp nhất anh từng có 🌈',
      emoji: '🌈',
    },
    {
      code: 'STAR',
      message: 'Em là ngôi sao sáng nhất trên bầu trời đêm của anh ⭐',
      emoji: '⭐',
    },
    {
      code: 'HEARTBEAT',
      message: 'Tim anh chỉ đập vì em thôi 💗',
      emoji: '💗',
    },
    {
      code: 'BABE',
      message: 'Baby của anh, người anh thương nhất 👶💕',
      emoji: '👶💕',
    },
  ],
  unlockedMessage: null,
};

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    unlockMessage: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase();
      const message = state.codeMessages.find((m) => m.code === code);
      if (message) {
        state.unlockedMessage = message;
      } else {
        throw new Error('Invalid code');
      }
    },
    clearUnlockedMessage: (state) => {
      state.unlockedMessage = null;
    },
  },
});

export const { unlockMessage, clearUnlockedMessage } = memorySlice.actions;
export default memorySlice.reducer;

