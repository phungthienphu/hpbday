import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { pauseBgm, resumeBgm } from "../../features/audioSlice";
import { playSfx } from "../../utils/playSfx";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

export const ButtonAudio = () => {
    const dispatch = useAppDispatch();
    const { paused } = useAppSelector(
        (state) => state.audio
    );

    const handleToggle = () => {
        playSfx("/sound/click.mp3", 0.7);
        if (paused) {
            dispatch(resumeBgm());
        } else {
            dispatch(pauseBgm());
        }
    };

    return (
        <motion.button
            onClick={handleToggle}
            className="px-2 py-2 rounded-2xl fixed top-12 right-4 z-50 select-none"
            style={{
                background: "linear-gradient(180deg, #fde047 0%, #f59e0b 50%, #d97706 100%)",
                boxShadow: "0 8px 0 #92400e, 0 12px 24px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                opacity: { delay: 0.5 },
                y: { delay: 0.5, type: "spring", stiffness: 200 },
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
            {paused ? (
                <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            ) : (
                <SpeakerWaveIcon className="w-6 h-6 text-white" />
            )}
        </motion.button>
    );
};
