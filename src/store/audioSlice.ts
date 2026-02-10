import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AudioState = {
  bgm: string | null;
  playing: boolean;
  volume: number;
};

const initialState: AudioState = {
  bgm: null,
  playing: false,
  volume: 1,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playBgm(state, action: PayloadAction<string>) {
      state.bgm = action.payload;
      state.playing = true;
    },
    stopBgm(state) {
      state.playing = false;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const { playBgm, stopBgm, setVolume } = audioSlice.actions;
export default audioSlice.reducer;
