import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICodeMessage {
  code: string;
  message?: string;
  messagemain?: string;
  messagesub?: string;
  emoji: string;
  url?: string;
  date?: string;
}

interface MemoryState {
  codeMessages: ICodeMessage[];
  unlockedMessage: ICodeMessage | null;
}

const initialState: MemoryState = {
  codeMessages: [
    {//2
      code: "THUTRANG1509",
      messagemain: "Chúc bạn may mắn lần sau!",
      messagesub:
        "Anh trêu đấy! Em vừa nhận được ngân phiếu 200k, việc của em bây giờ là hãy hun anh 2 cái vào 2 bên má, 3 cái vào môi và ôm anh thật chặt để nhận thưởng nhớ.",
      emoji: "💖",
      date: "6/12/2025",
    },
    {//7
      code: "FOREVER",
      message:
        "Tại sao?? Tại sao em lại cào đến cái thẻ này thay vì gọi cho anh và kể vì sao em buồnn, có phải tại anh không. Anh xin lũi, anh yêu em nhiều lắm, nhưng anh cũng đần nên không tránh được làm em buồn. Anh sẽ tự phạt mình lếu như em khong kể cho anh đấy ><",
      emoji: "💍",
      date: "30/12/2025",
    },
    {//5
      code: "SUNSHINE",
      message:
        "Anh nhớ em nhiều lắm, em có nhớ anh không? Nhớ anh thì nhắn anh 1 cái điii",
      emoji: "☀️",
      date: "28/12/2025",
    },
    {//6
      code: "ANGEL",
      message:
        "Cho dù cuộc sống có khó khăn, dù em thấy con đường phía trước còn nhiều trắc trở và nó khiến em lo lắng, buồn rầu. Em đừng quên phía sau lưng em vẫn luôn có anh. Anh sẽ luôn ở đây để làm chỗ dựa cho em, dù có thể anh không giúp em giải quyết được. Nhưng anh có thể ôm em và lắng nghe em để cùng em vượt qua mọi chuyện. Em đừng coi thường sự lợi hại của việc cùng đồng hành nhớ!",
      emoji: "🌈",
      date: "20/12/2025",
    },
    {//4
      code: "DREAM",
      message:
        "Đứa nào bắt nạt em, em nói anh nghe. Anh cũng hơi bị ghê gớm đấy khum kém gì bé đâu. Đụng vào anh thì đượt, đụng vào ngiu anh thì chếc với anhh. Êu mà nhỡ đó là anh thì sao nhở :v",
      messagesub:
        "Chắc anh phạt mình tu 1 tháng, mua cho em nhiều trà sữa, nhiều mì cayy... em thấy có được khômmm",
      emoji: "🌈",
      date: "7/12/2025",
    },
    {//3
      code: "STAR",
      message:
        "Em có biết anh thần tượng em kinh khủng không? Với anh anh chưa bao giờ nghĩ mình có thể có dược một cô người yêu đáng iu, chăm chỉ, xinh xắn như em. Anh trân trọng em lắm lắm. Vì thế, em đừng có tự giữ nỗi buồn 1 mình, hãy để cho fan hâm mộ của em là anh được đón nỗi buồn đó cùng em. Anh yêu em, và anh mong em sẽ luôn luôn vui vẻ, hãy thật yêu đời em nhé",
      emoji: "⭐",
      date: "10/12/2025",
    },
    {
      code: "HEARTBEAT",
      message: `   Chúng mình đã ở bên nhau được một năm rồi đấy. Từ ngày bắt đầu, anh chưa từng nghĩ rằng mình có thể yêu một người nhiều đến như vậy. Và đến bây giờ vẫn thế. Không chỉ mình em sợ chán đâu, mà anh cũng từng lo lắng điều đó. Dù anh luôn tỏ ra vô tư, nhưng thật ra anh sợ chúng mình mất nhau lắm.<br/>
May mắn là đến giờ, tình cảm ấy không những không phai nhạt mà còn ngày một đậm sâu và nồng cháy hơn trong anh. Anh từng sợ rằng gặp nhau nhiều quá sẽ khiến cả hai không còn háo hức nữa. Nhưng hóa ra không phải vậy. Bởi đến tận bây giờ, mỗi lần ngồi trên xe sang gặp em, trong lòng anh vẫn có một cảm giác thôi thúc rất đặc biệt. Hình như khi yêu nhiều, người ta sẽ như vậy: không còn sợ này sợ kia nữa, mà yên tâm cùng nhau vun đắp cho tình yêu của mình. Em nhỉ.<br/>
Dù mai sau có ra sao, anh vẫn mong chúng mình sẽ luôn ở bên nhau. Còn nếu không thể, anh vẫn tin rằng chúng mình đã có một tình yêu thật đẹp. Nhưng mà… phải ở bên nhau đấy nhé. Anh biết anh không hoàn hảo, nhưng anh luôn cố gắng tốt hơn từng chút một — dù nhỏ bé hay khó nhận ra — nhưng anh vẫn đang nỗ lực vì em, vì chúng mình. Em cũng hãy như thế cùng anh, và đừng bỏ cuộc nhé.`,
      emoji: "💗",
      url: "/mp3/tyca.mp3",
      date: "9/01/2026",
    },
    {//1
      code: "BABE",
      message:
        "Anh yêu em, anh yêu em, anh yêu em, cái gì quan trọng phải nói 3 lần!",
      messagesub:
        "Dù những tấm thiệp này sinh ra để em mở đọc mỗi khi buồn, nhưng anh không khuyến khích em mở thiệp thay vì nhắn tin hoặc nói cho anh nghe. Anh biết anh không phải là một người yêu tâm lý, khéo léo như bao người. Nhưng anh có thể lắng nghe em, dù trước đó anh làm chưa được tốt. Nhưng anh vẫn muốn làm lại, nên dù có chuyện gì, của riêng em hay của chúng mình, dù nhỏ xíu hay lớn thì em cũng phải nói cho anh nghe em nhé. Ngay lúc này cũng vậy. Yêu bé.",
      emoji: "👶💕",
      url: "",
      date: "28/11/2025",
    },
  ],
  unlockedMessage: null,
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    unlockMessage: (state, action: PayloadAction<string>) => {
      function parseVNDate(dateString: string) {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
      }
      const code = action.payload.toUpperCase();
      const message = state.codeMessages.find((m) => m.code === code);
      const noteDate = parseVNDate(message?.date || "");
      const now = new Date();
      if (message) {
        if (message.date && noteDate > now) {
          throw new Error("Bức thư này chưa tới ngày được xem nhaa!"+ " Ngày được xem: " + message.date);
        } else {
          state.unlockedMessage = message;
        }
      } else {
        throw new Error("Ơ mã này nghe lạ lắm, thử lại xem!!!");
      }
    },
    clearUnlockedMessage: (state) => {
      state.unlockedMessage = null;
    },
  },
});

export const { unlockMessage, clearUnlockedMessage } = memorySlice.actions;
export default memorySlice.reducer;
