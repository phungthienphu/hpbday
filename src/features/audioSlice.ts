import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AudioState = {
  bgm: string | null;
  playing: boolean;
  paused: boolean;
  volume: number;
};

const initialState: AudioState = {
  bgm: null,
  playing: false,
  paused: false,
  volume: 1,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playBgm(state, action: PayloadAction<string>) {
      state.bgm = action.payload;
      state.playing = true;
      state.paused = false;
    },

    pauseBgm(state) {
      state.paused = true;
      state.playing = false;
    },

    resumeBgm(state) {
      if (state.bgm) {
        state.playing = true;
        state.paused = false;
      }
    },

    stopBgm(state) {
      state.playing = false;
      state.paused = false;
      state.bgm = null;
    },

    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const {
  playBgm,
  pauseBgm,
  resumeBgm,
  stopBgm,
  setVolume,
} = audioSlice.actions;

export default audioSlice.reducer;
