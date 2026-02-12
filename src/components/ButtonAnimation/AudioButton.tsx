import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { pauseBgm, resumeBgm } from "../../store/audioSlice";
import { playSfx } from "../../ultils/playSfx";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import type { RootState } from "../../store/store";

export const ButtonAudio = () => {
    const dispatch = useDispatch();
    const { paused } = useSelector(
        (state: RootState) => state.audio
    );
    console.log(paused);

    const resume = () => {
        dispatch(pauseBgm())
        playSfx("/sound/click.mp3", 0.7);
    }
    const pause = () => {
        playSfx("/sound/click.mp3", 0.7);
        dispatch(resumeBgm())
    }
    return (
        <motion.button
            className=" px-2 py-2 rounded-2xl fixed top-12 right-4 z-50 text-xl sm:text-2xl font-black tracking-wide uppercase text-gray-900 shadow-2xl border-4 border-amber-200/80 select-none"
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
            {
                !paused ? <SpeakerWaveIcon onClick={resume} className="w-6 h-6 text-white" /> :
                    <SpeakerXMarkIcon onClick={pause} className="w-6 h-6 text-white" />
            }
        </motion.button>
    )
}