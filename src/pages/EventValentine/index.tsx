"use client";

import { useState } from "react";
import { story } from "../../types/story";
import { badEnd } from "../../types/story";
import CodeMessage from "./CodeMessage";
import { useDispatch } from "react-redux";
import { playBgm } from "../../store/audioSlice";

export default function EventPage() {
    const [sceneId, setSceneId] = useState(0);
    const [status, setStatus] = useState(1);
    const dispatch = useDispatch();
    const [isOpen, setIsopen] = useState(false);
    // const [affection, setAffection] = useState(0);

    const totalScenes = story.length;
    const progress =
        totalScenes > 1 ? Math.min(100, (sceneId / (totalScenes - 1)) * 100) : 0;

    // Scene kết thúc
    if (status < 0) {
        if (status === -1) {
            dispatch(playBgm("/audiogame/badend1.mp3"));
        }
        else {
            dispatch(playBgm("/audiogame/losesound.mp3"));

        }
        const badEndingIndex = -status - 1;
        const badEnding = badEnd[badEndingIndex] || badEnd[0];

        const handleRestart = () => {
            setSceneId(0);
            dispatch(playBgm("/audiogame/ingame.mp3"));
            setStatus(1);
            // setAffection(0);
        };
        const handleRetryLast = () => {
            setSceneId((prev) => (prev > 0 ? prev - 1 : 0));
            dispatch(playBgm("/audiogame/ingame.mp3"));
            setStatus(1);
        };
        return (
            <div
                className="h-screen w-screen bg-cover bg-center flex flex-col justify-end relative"
                style={{ backgroundImage: `url(${badEnding.background})` }}
            >
                {/* Thanh tiến trình hành trình */}
                <div className="absolute top-0 left-0 w-full px-4 pt-4">
                    <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-pink-400 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {/* Dialogue box */}
                {/* {sceneId != 0 ? <button onClick={handleChoiceBack} className="absolute top-4 left-1 px-3 py-1 bg-white rounded">Go back</button>
                    : <></>
                } */}
                <div style={{ backgroundImage: `url(${badEnding.background})` }} className="w-full h-full bg-cover bg-center">

                </div>
                <div className="bg-black/70 text-white p-6 rounded-sm">
                    <p className="font-bold mb-2">{badEnding.speaker}</p>
                    <p className="mb-4 " dangerouslySetInnerHTML={{ __html: badEnding.dialogue }} />

                    {/* Choices */}
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                            onClick={handleRetryLast}
                        >
                            Chơi lại
                        </button>
                        <button
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                            onClick={handleRestart}
                        >
                            Chơi lại từ đầu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const scene = story[sceneId];

    const handleChoice = (choice: any) => {
        console.log(choice);
        if (choice.next === 'prevending') {
            dispatch(playBgm("/audiogame/winner.mp3"));

        }
        if (choice.next === 'ending') {
            if (choice.affection === 1) {
                setIsopen(true)
            }
            setSceneId(0);
        }
        setStatus(choice.affection);
        setSceneId((prev) => prev + 1);

        // status: trạng thái lựa chọn hiện tại (dùng để check "chết ngay")
        // affection: tổng điểm tình cảm tích lũy
        // setAffection((prev) => prev + choice.affection);
    };
    const handleChoiceBack = () => {
        setSceneId(sceneId - 1)
    }

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col justify-end relative"
            style={{ backgroundImage: `url(${scene.background})` }}
        >
            {/* Thanh tiến trình hành trình */}
            <div className="absolute top-0 left-0 w-full px-4 pt-4">
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-pink-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            {/* Dialogue box */}
            {sceneId != 0 ? <button onClick={handleChoiceBack} className="absolute top-8 left-4 px-3 py-1 bg-white rounded">Go back</button>
                : <></>
            }
            <div style={{ backgroundImage: `url(${scene.background})` }} className="w-full h-full bg-cover bg-center">

            </div>
            <div className="bg-black/70 text-white p-6 rounded-sm">
                <p className="font-bold mb-2">{scene.speaker}</p>
                <p className="mb-4 " dangerouslySetInnerHTML={{ __html: scene.dialogue }} />

                {/* Choices */}
                <div className="flex flex-col gap-2">
                    {scene.choices.map((choice, index) => (
                        <button
                            key={index}
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                            onClick={() => handleChoice(choice)}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            </div>
            {isOpen && <CodeMessage
                onClose={() => setIsopen(false)}
                unlockedMessage={message}
            />}
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
