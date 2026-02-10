export type Choice = {
  text: string;
  affection: number;
  next: string;
};

export type Scene = {
  id: string;
  background: string;
  speaker: string;
  dialogue: string;
  choices: Choice[];
};

export const story: Scene[] = [
  {
    id: "scene0",
    background: "/valentine/opening.png",
    speaker: "Cô ấy",
    dialogue:
      "Ngày xửa ngày xưa, có một bé Cua cute mới uncrush 1 anh zai nào đó <br/> Bé Cua được bạn bè rủ rê dùng ứng dụng hẹn hò...",
    choices: [{ text: "Tiếp tục", affection: 1, next: "scene1" }],
  },
  {
    id: "scene1",
    background: "/valentine/opening2.png",
    speaker: "Cô ấy",
    dialogue:
      "Bé Cua đã gặp được khá nhiều EM trai đẹp zai. Tâm sự nhìu và rất vui vẻ...<br/>Đã rất gần tới ngày thành đôi, tuy nhiên bé vẫn cảm thấy thiếu thiếu gì đó...",
    choices: [{ text: "Tiếp tục", affection: 1, next: "scene2" }],
  },
  {
    id: "scene1",
    background: "/valentine/branchout.png",
    speaker: "Cô ấy",
    dialogue:
      "Bé cua đã gặp được EM Khỉ, ngỡ như nhắn tin khá hợp nhau, khá cuốn 😒 <br/>Hãy giúp bé Cua lựa chọn",
    choices: [{ text: "Gặp bé Khỉ", affection: -1, next: "scene2" },{ text: "Không gặp bé Khỉ", affection: 0, next: "scene2" }],
  },
  {
    id: "scene1",
    background: "/valentine/help1.png",
    speaker: "Cô ấy",
    dialogue:
      "Wow có một bạn lợn khá đẹp trai hơn muốn kết bạn với Cua.<br/>Hãy giúp bé Cua đưa ra lựa chọn:",
    choices: [
      { text: "Đồng ý kết bạn", affection: 1, next: "scene3" },
      { text: "Kệ nó", affection: -5, next: "scene3" },
    ],
  },
  {
    id: "scene2",
    background: "/valentine/step2.png",
    speaker: "",
    dialogue:
      "2 Bạn nhỏ nhắn tin với nhau rất vui vẻ, có vẻ như bạn Cua đã tìm được chân ái :D",
    choices: [{ text: "Tiếp tục", affection: 1, next: "scene2" }],
  },
  {
    id: "scene2",
    background: "/valentine/help2.png",
    speaker: "Cô ấy",
    dialogue:
      "Bạn Lợn ngoài đẹp trai ra còn hát rất hay, giọng hát đã khiến bạn Cua siêu lòngg.<br/>Bài hát đầu tiên bạn Lợn hát cho Cua nghe là gì nhỉ?",
    choices: [
      { text: "Quốc Ca", affection: -2, next: "scene4" },
      { text: "Mừng chúa giáng sinh", affection: -2, next: "scene4" },
      { text: "Giờ thì", affection: 1, next: "scene4" },
    ],
  },

  {
    id: "scene3",
    background: "/valentine/step3.png",
    speaker: "Bạn",
    dialogue:
      "Bạn Lợn rất thích ngắm bạn Cua, đã nhiều lần muốn bạn Cua gửi ảnh cho xiem.<br/>Bức ảnh đầu tiên bạn Cua checkin cho bạn Lợn là khi bạn Cua đi đâu vậy?",
    choices: [
      { text: "Đi chơi với các sư tỷ", affection: -3, next: "scene5" },
      { text: "Đi ăn với em Thủy", affection: 1, next: "scene5" },
      { text: "Có gửi ảnh nào đâu...", affection: -3, next: "scene5" },
    ],
  },

  {
    id: "scene4",
    background: "/valentine/help4.png",
    speaker: "Cô ấy",
    dialogue:
      "Sau vài tuần nói chuyện, 2 bạn rất chịu nhau rùi tuy nhiên vẫn còn thiếu bước gặp nhau.<br/>Bạn Lợn đã đề nghị gặp bạn Cua, hãy giúp Cua đưa ra lựa chọn:",
    choices: [
      { text: "Oke gặp", affection: 2, next: "scene6" },
      { text: "Kệ nó", affection: -5, next: "scene6" },
    ],
  },
  {
    id: "scene5",
    background: "/valentine/step4.png",
    speaker: "Bạn",
    dialogue:
      "2 Bạn đã chuẩn bị có buổi gặp đầu tiên... Rất ngược đời là bạn Cua lại là người đi đón bạn Lợn béo...",
    choices: [{ text: "Tiếp tục", affection: 1, next: "scene6" }],
  },
  {
    id: "scene5",
    background: "/valentine/help6.png",
    speaker: "Bạn",
    dialogue:
      "2 bạn đã gặp được nhau, cảm xúc thật dâng trào,<br/>Bạn có thấy Cua và Lợn rất đẹp đôi không??",
    choices: [
      { text: "Đẹp quáa", affection: 1, next: "scene6" },
      { text: "Chả đẹpp", affection: -4, next: "scene6" },
    ],
  },
  {
    id: "scene6",
    background: "/valentine/winner.png",
    speaker: "Bạn đã chiến thắng!!!",
    dialogue: "Vậy là bạn đã là người chiến thắng!!! Xin chúc mừng",
    choices: [
      { text: "Xem thêm *", affection: 1, next: "ending" },
      { text: "Trở lại", affection: 0, next: "ending" },
    ],
  },
];

export const badEnd = [
  {
    id: "badend1",
    background: "/valentine/badend1.png",
    speaker: "",
    dialogue:
      "Game over!! Cua thì sao mà hợp với Khỉ được trời -_-",
    choices: [{ text: "Chơi lại"}],
  },
  {
    id: "badend2",
    background: "/valentine/badend3.png",
    speaker: "Bạn đã thua!!!",
    dialogue:
      "Game over! Có thật là nghe ngta hát không đóo???",
    choices: [{ text: "Chơi lại"}],
  },
  {
    id: "badend3",
    background: "/valentine/badend2.png",
    speaker: "",
    dialogue:
      "Game over!! Có thế mà cũng quên, tí phải phạt thật mạnh 😠",
    choices: [{ text: "Chơi lại"}],
  },{
    id: "badend4",
    background: "/valentine/badend2.png",
    speaker: "",
    dialogue:
      "Game over!! Chỗ nào không đẹp hả??? 😠",
    choices: [{ text: "Chơi lại"}],
  },
  {
    id: "badend5",
    background: "/valentine/badend2.png",
    speaker: "Bạn đã thua!!!",
    dialogue:
      "Game over! Thấy trai đẹp mà không accept là thua ròiii???",
    choices: [{ text: "Chơi lại"}],
  },
];
