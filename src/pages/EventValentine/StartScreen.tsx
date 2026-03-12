import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { playBgm, stopBgm } from "../../features/audioSlice";
import { motion } from "framer-motion";
import { playSfx } from "../../utils/playSfx";

export default function StartScreen() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onStart = () => {
        playSfx("/sound/click.mp3", 0.7);
        dispatch(playBgm("/audiogame/ingame.mp3"));
        navigate("/event-page");
    };

    const onBack = () => {
        dispatch(stopBgm());
        navigate(-1);
    };

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/valentine/bg-game.webp')" }}
        >
            {/* Overlay tối để chữ nổi bật (giống menu game) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

            {/* Speed lines / motion streaks (Subway Surfers / Temple Run) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 bg-white/20 rounded-full"
                        style={{
                            width: `${40 + i * 20}%`,
                            left: `${i * 18}%`,
                            top: `${20 + i * 15}%`,
                            transform: `rotate(-${15 + i * 5}deg)`,
                        }}
                        animate={{ x: ["-100%", "100vw"] }}
                        transition={{
                            duration: 2.5 + i * 0.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Hạt sáng / sparkles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/60"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${15 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 1.5 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}

            {/* Nội dung chính */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
                {/* Game title – kiểu 3D / outline (Subway Surfers) */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white select-none"
                    style={{
                        textShadow: `
                            4px 4px 0 #c41e5a,
                            6px 6px 0 #9d174d,
                            8px 8px 12px rgba(0,0,0,0.5),
                            0 0 24px rgba(196,30,90,0.4)
                        `,
                        WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: [0, -6, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.5 },
                        scale: { type: "spring", stiffness: 200, damping: 15 },
                        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                    }}
                >
                    CHÚNG TA
                </motion.h1>
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white select-none -mt-2"
                    style={{
                        textShadow: `
                            4px 4px 0 #c41e5a,
                            6px 6px 0 #9d174d,
                            8px 8px 12px rgba(0,0,0,0.5),
                            0 0 24px rgba(196,30,90,0.4)
                        `,
                        WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: [0, -6, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.1 },
                        scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 },
                        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
                    }}
                >
                    KHI ẤY
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-4 text-base sm:text-lg text-white/90 font-medium tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Sẵn sàng cho chuyến hành trình cảm xúc?
                </motion.p>

                {/* Nút PLAY chính – kiểu Subway Surfers / Temple Run */}
                <motion.button
                    onClick={onStart}
                    className="mt-10 sm:mt-12 px-14 py-4 rounded-2xl text-xl sm:text-2xl font-black tracking-wide uppercase text-gray-900 shadow-2xl border-4 border-amber-200/80 select-none"
                    style={{
                        background: "linear-gradient(180deg, #fde047 0%, #f59e0b 50%, #d97706 100%)",
                        boxShadow: "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: [
                            "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                            "0 6px 0 #92400e, 0 10px 20px rgba(0,0,0,0.35)",
                            "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                        ],
                    }}
                    transition={{
                        opacity: { delay: 0.5 },
                        y: { delay: 0.5, type: "spring", stiffness: 200 },
                        boxShadow: { duration: 0.8, repeat: Infinity },
                    }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 10px 0 #92400e, 0 16px 32px rgba(0,0,0,0.5)",
                    }}
                    whileTap={{
                        scale: 0.98,
                        y: 4,
                        boxShadow: "0 4px 0 #92400e, 0 6px 12px rgba(0,0,0,0.4)",
                    }}
                >
                    Bắt đầu
                </motion.button>
                <motion.button
                    onClick={onBack}
                    className="mt-5 sm:mt-5 px-14 py-4 rounded-2xl text-xl sm:text-2xl font-black tracking-wide uppercase text-gray-900 shadow-2xl border-4 border-amber-200/80 select-none"
                    style={{
                        background: "linear-gradient(180deg, #fde047 0%, #f59e0b 50%, #d97706 100%)",
                        boxShadow: "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: [
                            "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                            "0 6px 0 #92400e, 0 10px 20px rgba(0,0,0,0.35)",
                            "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
                        ],
                    }}
                    transition={{
                        opacity: { delay: 0.5 },
                        y: { delay: 0.5, type: "spring", stiffness: 200 },
                        boxShadow: { duration: 0.8, repeat: Infinity },
                    }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 10px 0 #92400e, 0 16px 32px rgba(0,0,0,0.5)",
                    }}
                    whileTap={{
                        scale: 0.98,
                        y: 4,
                        boxShadow: "0 4px 0 #92400e, 0 6px 12px rgba(0,0,0,0.4)",
                    }}
                >
                    Trở lại
                </motion.button>

                {/* Gợi ý tap (mobile) */}
                <motion.p
                    className="mt-6 text-sm text-white/70"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Chạm để bắt đầu
                </motion.p>
            </div>

            {/* Góc dưới – có thể thêm "Best score" hoặc logo nhỏ sau */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 text-white/80 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    Hành trình tình yêu
                </span>
            </div>
        </div>
    );
}
