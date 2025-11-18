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
  messagesub?: string;
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
      code: 'THUTRANG1509',
      message: 'Chúc bạn may mắn lần sau!',
      messagesub: 'Anh trêu đấy! Em vừa nhận được ngân phiếu 200k, việc của em bây giờ là hãy hun anh 2 cái vào 2 bên má, 3 cái vào môi và ôm anh thật chặt để nhận thưởng nhớ.',
      emoji: '💖',
    },
    {
      code: 'FOREVER',
      message: 'Tại sao?? Tại sao em lại cào đến cái thẻ này thay vì gọi cho anh và kể vì sao em buồnn, có phải tại anh không. Anh xin lũi, anh yêu em nhiều lắm, nhưng anh cũng đần nên không tránh được làm em buồn. Anh sẽ tự phạt mình lếu như em khong kể cho anh đấy ><',
      emoji: '💍',
    },
    {
      code: 'SUNSHINE',
      message: 'Anh nhớ em nhiều lắm, em có nhớ anh không? Nhớ anh thì nhắn anh 1 cái điii',
      emoji: '☀️',
    },
    {
      code: 'ANGEL',
      message: 'Cho dù cuộc sống có khó khăn, dù em thấy con đường phía trước còn nhiều trắc trở và nó khiến em lo lắng, buồn rầu. Em đừng quên phía sau lưng em vẫn luôn có anh. Anh sẽ luôn ở đây để làm chỗ dựa cho em, dù có thể anh không giúp em giải quyết được. Nhưng anh có thể ôm em và lắng nghe em để cùng em vượt qua mọi chuyện. Em đừng coi thường sự lợi hại của việc cùng đồng hành nhớ!',
      emoji: '🌈',
    },
    {
      code: 'DREAM',
      message: 'Đứa nào bắt nạt em, em nói anh nghe. Anh cũng hơi bị ghê gớm đấy khum kém gì bé đâu. Đụng vào anh thì đượt, đụng vào ngiu anh thì chếc với anhh. Êu mà nhỡ đó là anh thì sao nhở :v',
      messagesub:'Chắc anh phạt mình tu 1 tháng, mua cho em nhiều trà sữa, nhiều mì cayy... em thấy có được khômmm',
      emoji: '🌈',
    },
    {
      code: 'STAR',
      message: 'Em có biết anh thần tượng em kinh khủng không? Với anh anh chưa bao giờ nghĩ mình có thể có dược một cô người yêu đáng iu, chăm chỉ, xinh xắn như em. Anh trân trọng em lắm lắm. Vì thế, em đừng có tự giữ nỗi buồn 1 mình, hãy để cho fan hâm mộ của em là anh được đón nỗi buồn đó cùng em. Anh yêu em, và anh mong em sẽ luôn luôn vui vẻ, hãy thật yêu đời em nhé',
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

