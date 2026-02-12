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

    // khởi tạo 1 lần
    useEffect(() => {
        const audio = new Audio();
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    // đổi source
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !bgm) return;

        // tránh reload nếu cùng src
        if (!audio.src.includes(bgm)) {
            audio.src = bgm;
            audio.load();
        }
    }, [bgm]);

    // volume
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
    }, [volume]);

    // play / pause logic chuẩn
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
      
        if (!bgm) {
          audio.pause();
          audio.removeAttribute("src");
          return;
        }
      
        const needChangeSrc = !audio.src.includes(bgm);
      
        if (needChangeSrc) {
          audio.src = bgm;
          // KHÔNG nhất thiết phải gọi audio.load() thủ công
        }
      
        if (playing && !paused) {
          // đảm bảo track mới được play
          audio
            .play()
            .catch(() => {
              // có thể log để debug quyền autoplay
            });
        } else {
          audio.pause();
        }
      
        audio.volume = volume;
      }, [bgm, playing, paused, volume]);

    return <>{children}</>;
}
