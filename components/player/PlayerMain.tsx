import styles from './Player.module.scss';
import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { PlayerButton } from './PlayerButton';
import { PlayerControls } from './PlayerControls';
import { PlayerText } from './PlayerText';

type Context = {
    setTime: (ms: number) => void;
    togglePlay: () => void;
    playing: boolean;
    errored: boolean;
    audio: HTMLAudioElement | null;
}
const PlayerContext = React.createContext({} as Context);
export const usePlayer = () => React.useContext(PlayerContext);

export const PlayerMain: React.FC<{
    name: string;
    artist: string;
    uri: string;
    previewURL?: string;
}> = ({ name, artist, uri, previewURL }) => {
    const [playing, setPlaying] = useState(false);
    const [errored, setErrored] = useState(false);
    const audio = useRef<HTMLAudioElement | null>(null);

    // Function to toggle play, create audio instance if necessary
    const togglePlay = useCallback(() => {
        if(!audio.current) {
            audio.current = new Audio(previewURL);

            // Handling audio on end
            const onEnd = () => setPlaying(false);
            audio.current.addEventListener('ended', onEnd);
        }

        if(!playing) {
            audio.current.play()
                .then(() => {
                    setPlaying(true);
                })
                .catch(error => {
                    // Cannot play audio preview
                    setErrored(true);
                })
        } else {
            audio.current.pause();
            setPlaying(false);
        }
    }, [audio.current, playing]);

    // Function to change audio position
    const setTime = (ms: number) => {
        if(!audio.current) return;
        audio.current.currentTime = ms;
    }

    const value = {
        setTime,
        togglePlay,
        playing,
        errored,
        audio: audio.current
    }
    return(
        <PlayerContext.Provider value={value}>
            <div className={styles['main']}>
                <PlayerButton />
                <PlayerText 
                    artist={artist}
                    name={name}
                    uri={uri}
                />
            </div>
            <PlayerControls />
        </PlayerContext.Provider>
    )
}