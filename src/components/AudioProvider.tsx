import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function AudioProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { bgm, playing, volume } = useSelector(
        (state: RootState) => state.audio
    );

    console.log(bgm, playing, volume);
    
    // Khởi tạo audio element 1 lần
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.loop = true;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    // Điều khiển nhạc theo redux
    useEffect(() => {
        if (!audioRef.current) return;

        if (bgm && audioRef.current.src !== bgm) {
            audioRef.current.src = bgm;
        }

        audioRef.current.volume = volume;

        if (playing) {
            console.log('playing');
            
            audioRef.current.play().catch(() => { });
        } else {
            audioRef.current.pause();
        }
    }, [bgm, playing, volume]);

    return <>{children}</>;
}
