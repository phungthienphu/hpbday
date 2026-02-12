"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { story, type Choice } from "../../types/story";
import { badEnd } from "../../types/story";
import CodeMessage from "./CodeMessage";
import { useDispatch } from "react-redux";
import { playBgm } from "../../store/audioSlice";
import { useNavigate } from "react-router-dom";
import { playSfx } from "../../ultils/playSfx";

const progressBarClasses =
    "w-full h-2.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg";
const progressFillClasses =
    "h-full rounded-full transition-all duration-300 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 shadow-[0_0_12px_rgba(244,114,182,0.6)]";

const GameButton = ({
    children,
    onClick,
    primary = true,
}: {
    children: React.ReactNode;
    onClick: () => void;
    primary?: boolean;
}) => (
    <motion.button
        onClick={onClick}
        className={
            primary
                ? "w-full py-3.5 px-6 rounded-xl text-base font-bold text-gray-900 uppercase tracking-wide border-2 border-amber-200/80 shadow-lg"
                : "w-full py-3 px-6 rounded-xl text-base font-bold text-white uppercase tracking-wide border-2 border-white/50 bg-white/15 backdrop-blur-sm"
        }
        style={
            primary
                ? {
                    background: "linear-gradient(180deg, #fde047 0%, #f59e0b 50%, #d97706 100%)",
                    boxShadow: "0 6px 0 #92400e, 0 8px 16px rgba(0,0,0,0.3)",
                }
                : undefined
        }
        whileHover={primary ? { scale: 1.03, boxShadow: "0 8px 0 #92400e, 0 12px 20px rgba(0,0,0,0.35)" } : { scale: 1.02 }}
        whileTap={primary ? { scale: 0.98, y: 2, boxShadow: "0 3px 0 #92400e" } : { scale: 0.98 }}
    >
        {children}
    </motion.button>
);

export default function EventPage() {
    const [sceneId, setSceneId] = useState(0);
    const [status, setStatus] = useState(1);
    const dispatch = useDispatch();
    const [isOpen, setIsopen] = useState(false);
    const navigator = useNavigate()
    const totalScenes = story.length;
    const progress =
        totalScenes > 1 ? Math.min(100, (sceneId / (totalScenes - 1)) * 100) : 0;

    if (status < 0) {
        if (status === -1) {
            dispatch(playBgm("/audiogame/badend1.mp3"));
        } else {
            dispatch(playBgm("/audiogame/losesound.mp3"));
        }
        const badEndingIndex = -status - 1;
        const badEnding = badEnd[badEndingIndex] || badEnd[0];

        const handleRestart = () => {
            setSceneId(0);
            dispatch(playBgm("/audiogame/ingame.mp3"));
            setStatus(1);
        };
        const handleRetryLast = () => {
            setSceneId((prev) => (prev > 0 ? prev - 1 : 0));
            dispatch(playBgm("/audiogame/ingame.mp3"));
            setStatus(1);
        };

        return (
            <div
                className="h-screen w-screen bg-cover bg-center flex flex-col justify-end relative overflow-hidden"
                style={{ backgroundImage: `url(${badEnding.background})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full px-4 pt-6 z-10">
                    <div className={progressBarClasses}>
                        <div
                            className={progressFillClasses}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <div
                    className="flex-1 bg-cover bg-center"
                    style={{ backgroundImage: `url(${badEnding.background})` }}
                />
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 mx-4 mb-4 p-5 sm:p-6 rounded-2xl border-2 border-white/30 bg-black/60 backdrop-blur-md text-white shadow-2xl"
                >
                    <p className="text-sm font-bold text-rose-200 mb-1 uppercase tracking-wider">
                        {badEnding.speaker}
                    </p>
                    <p
                        className="mb-5 text-white/95 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: badEnding.dialogue }}
                    />
                    <div className="flex flex-col gap-3">
                        <GameButton primary onClick={handleRetryLast}>
                            Chơi lại
                        </GameButton>
                        <GameButton primary onClick={handleRestart}>
                            Chơi lại từ đầu
                        </GameButton>
                    </div>
                </motion.div>
            </div>
        );
    }

    const scene = story[sceneId];

    const handleChoice = (choice: Choice) => {
        playSfx("/sound/click.mp3", 0.5);
        if (choice.next === "prevending") {
            dispatch(playBgm("/audiogame/winner.mp3"));
        }
        if (choice.next === "ending") {
            if (choice.affection === 1) setIsopen(true);
            setSceneId(0);
        }
        setStatus(choice.affection);
        setSceneId((prev) => prev + 1);
    };

    const handleChoiceBack = () => {
        setSceneId((prev) => (prev > 0 ? prev - 1 : 0));
    };
    const handleChoiceQuit = () => {
        navigator('/start-game')
    }

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col justify-end relative overflow-hidden"
            style={{ backgroundImage: `url(${scene.background})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/50 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full px-4 pt-6 z-10">
                <div className={progressBarClasses}>
                    <div
                        className={progressFillClasses}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleChoiceQuit}
                className="absolute top-20 left-4 z-20 px-4 py-2 rounded-xl text-sm font-bold text-white border-2 border-white/40 bg-black/40 backdrop-blur-sm shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                ← Thoát
            </motion.button>
            {sceneId !== 0 && (
                <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handleChoiceBack}
                    className="absolute top-20 left-4 z-20 px-4 py-2 rounded-xl text-sm font-bold text-white border-2 border-white/40 bg-black/40 backdrop-blur-sm shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    ← Quay lại
                </motion.button>
            )}
            <div
                className="flex-1 bg-cover bg-center"
                style={{ backgroundImage: `url(${scene.background})` }}
            />
            <motion.div
                key={sceneId}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 mx-4 mb-4 p-5 sm:p-6 rounded-2xl border-2 border-white/30 bg-black/55 backdrop-blur-md text-white shadow-2xl"
            >
                <p className="text-sm font-bold text-rose-200 mb-2 uppercase tracking-wider">
                    {scene.speaker}
                </p>
                <p
                    className="mb-5 text-white/95 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: scene.dialogue }}
                />
                <div className="flex flex-col gap-3">
                    {scene.choices.map((choice, index) => (
                        <GameButton
                            key={index}
                            primary
                            onClick={() => handleChoice(choice)}
                        >
                            {choice.text}
                        </GameButton>
                    ))}
                </div>
            </motion.div>
            {isOpen && (
                <CodeMessage
                    onClose={() => setIsopen(false)}
                    unlockedMessage={message}
                />
            )}
        </div>
    );
}

const message = {
    code: "HEARTBEAT",
    message: `Vậy là Lợn và Cua đã là của nhau, cùng anh chúc 2 bạn nhỏ này bên nhau thật hạnh phúc nha bé, nhưng hạnh phúc thế nào thì cũng không thể
    bằng chúng mình được em nhở?<br/> Anh yêu em. Bé yêu của anh, chúng mình bên nhau thoáng cái đã 1 năm rồi, đây là cái valentine thứ 2 mình có nhau, dù cảm xúc có lẽ khác nhiều so với cái đầu tiên, nhưng có 1 cái không thay đổi là 2 đứa mình vẫn ngồi đây cùng nhau. Đó là điều khiến anh vui nhất nhưng cũng 1 phần khiến anh lo lắng nhất.<br/> 1 năm đã trải qua nhiều chuyện, nhiều chuyển biến, có thể nó chưa là gì so với chặng đường sắp tới, nhưng anh tin mình hãy cứ tin tưởng và yêu thương nhau thì mọi thứ sẽ chẳng có gì là khó khăn cả. <br/>Anh biết còn khá sớm để mình có thể nói về thứ gì đó lớn lao trong tương lai, có lẽ em cũng nghĩ như vậy. Nhưng anh vẫn muốn nói với em, với chúng mình điều này: Anh yêu em, hãy cùng cố gắng cùng anh nhé, dù mọi thứ không phải lúc nào cũng màu hồng như những gì anh mơ, 1 năm- 2 năm hoặc nhiều năm nữa, anh sẽ cố gắng để dù không là màu hồng thì cũng không tô màu đen, màu xám cho bức tranh của 2 chúng mình. <br/>Đừng cười anh vì anh sến súa, anh xấu hổ... Trước mắt hãy cùng tận hưởng ngày valentine thứ 2 này thật trọn vẹn cùng nhau nhé. Vợ yêu của anh.`,
    emoji: "💗",
    url: "/mp3/tyca.mp3",
    date: "9/01/2026",
}
