
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playBgm } from "../../store/audioSlice";
export default function StartScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onStart = () => {
        dispatch(playBgm("/audiogame/ingame.mp3"));
        navigate('/event-page')
    }
    return (
        <div
            className="h-screen w-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/valentine/bg-game.png')" }}
        >
            {/* Overlay tối */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Nội dung */}
            <div className="relative z-10 text-center text-white">
                <h1 className="text-3xl font-bold mb-4 tracking-wide">
                    Chúng Ta Khi Ấy
                </h1>

                <p className="mb-10 text-lg opacity-80">
                    Một câu chuyện về những lựa chọn và cảm xúc
                </p>

                <button
                    onClick={onStart}
                    className="px-10 py-3 border border-white text-lg
                     hover:bg-white hover:text-black
                     transition-all duration-300"
                >
                    Bắt đầu
                </button>
            </div>
        </div>
    );
}
