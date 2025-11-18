import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MemoryAlbum {
  id: string;
  title: string;
  description: string;
  date: string;
  folder: string;
}

interface CodeMessage {
  code: string;
  message: string;
  emoji: string;
}

interface MemoryState {
  memories: MemoryAlbum[];
  codeMessages: CodeMessage[];
  unlockedMessage: CodeMessage | null;
}

const initialState: MemoryState = {
  memories: [
    {
      id: 'first',
      title: 'Những buổi gặp gỡ đầu tiênn',
      description: 'Khoảnh khắc mở đầu hành trình hai đứa... trông cái mặt anh gượng gạo kinh, tại em xinh quá nên anh run đấy!',
      date: '09/01/2025',
      folder: 'first',
    },
    {
      id: 'firstbirthdayhim',
      title: 'Sinh nhật đầu tiên của anh cùng em',
      description: 'Lần đầu có người tự tay chuẩn bị sinh nhật siêu sịn cho anh.',
      date: '13/9/2025',
      folder: 'firstbirthdayhim',
    },
    {
      id: 'firstbingxu',
      title: 'Lần đầu anh ăn kem',
      description: 'Em dẫn anh đi ăn Bingxu lần đầu...',
      date: '17/08/2025',
      folder: 'firstbingxu',
    },
    {
      id: 'firsttour',
      title: 'Chuyến du lịch đầu tiênn',
      description: 'Lần đầu đi xa cùng nhau, đầy tiếng cười và cũng đầy lần đầu khác hihi..',
      date: '20/06/2025',
      folder: 'firsttour',
    },
    {
      id: 'firsthvnn',
      title: 'Em ra trường',
      description: 'Sự kiện trọng đại của em',
      date: '25/05/2025',
      folder: 'firsthvnn',
    },
    {
      id: 'firstchild',
      title: 'Những đứa trẻ tụi mình',
      description: 'Lần đầu em bảo anh như trẻ conn -_- sau đấy thì như cơm bữa!',
      date: '12/04/2025',
      folder: 'firstchild',
    },
    {
      id: 'firsttiktok',
      title: 'TikTok vibes',
      description: 'Videos đầu tiên bắt trend cùng nhau.',
      date: '25/03/2025',
      folder: 'firsttiktok',
    },
    {
      id: 'second',
      title: 'Cafe học baìi',
      description: 'Lần đầu đi cafe học bài cùng nhau, nhưng khum học lắm -.-',
      date: '25/02/2025',
      folder: 'second',
    },
    {
      id: 'musicbox',
      title: 'Lần đầu đi MusicBox',
      description: 'Lần đầu đi MusicBox cùng nhau, tuy có chút vội vã nhưng em xinh.',
      date: '17/05/2025',
      folder: 'musicbox',
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

