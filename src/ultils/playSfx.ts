const sounds: Record<string, HTMLAudioElement> = {};

export function playSfx(url: string, volume = 1) {
    if (!sounds[url]) {
        sounds[url] = new Audio(url);
    }
    const audio = sounds[url];
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
}
