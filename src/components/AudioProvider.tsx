import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function AudioProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { bgm, playing, paused, volume } = useSelector(
        (state: RootState) => state.audio
    );

    useEffect(() => {
        const audio = new Audio();
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!bgm) {
            audio.pause();
            audio.removeAttribute("src");
            return;
        }

        if (!audio.src.includes(bgm)) {
            audio.src = bgm;
        }

        if (playing && !paused) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }

        audio.volume = volume;
    }, [bgm, playing, paused, volume]);

    return <>{children}</>;
}
