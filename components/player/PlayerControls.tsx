import styles from './Player.module.scss';
import { PlayerButton } from './PlayerButton';
import { ShuffleIcon } from '../../assets/icons/ShuffleIcon';
import { ReverseIcon } from '../../assets/icons/ReverseIcon';
import { PauseIcon } from '../../assets/icons/PauseIcon';
import { PlayIcon } from '../../assets/icons/PlayIcon';
import { RepeatIcon } from '../../assets/icons/RepeatIcon';
import { useCallback, useEffect, useRef, useState } from 'react';

const DURATION = 30 * 1000;
export const PlayerControls: React.FC<{
    previewURL: string;
}> = ({ previewURL }) => {
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [errored, setErrored] = useState(false);
    const audio = useRef<HTMLAudioElement | null>(null);
    const container = useRef<HTMLDivElement>(null);
    const mouseDown = useRef(false);

    // Function to toggle play, create audio instance if necessary
    const play = useCallback(() => {
        if(!audio.current) {
            setCurrent(0);
            audio.current = new Audio(previewURL);
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

    // Making sure to reset player on end
    useEffect(() => {
        if(!audio.current) return;

        const onEnd = () => {
            setPlaying(false);
            setCurrent(0);
        }

        audio.current.addEventListener('ended', onEnd);
        return () => {
            if(!audio.current) return;
            audio.current.removeEventListener('ended', onEnd);
            audio.current.pause();
        }
    }, [audio.current]);

    // Setting and clearing track interval based on playing state
    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if(playing) {
            interval = setInterval(() => {
                setCurrent(current => current + 1000);
            }, 1000);
        } else {
            if(!interval) return;
            clearInterval(interval);
            interval = null;
        }

        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    }, [playing]);

    // Functions to allow user to change track position
    const changeCurrentTime = useCallback((e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!container.current) return;
        const { left: elementLeft, width } = container.current.getBoundingClientRect();
        const left = e.pageX - elementLeft;
        let percentage = left / width;
        if(percentage > 1) percentage = 1;
        if(percentage < 0) percentage = 0;
        const currentTime = Math.floor(percentage * DURATION);
        setCurrent(currentTime);

        if(!audio.current) return;
        audio.current.currentTime = currentTime / 1000;
    }, []);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        changeCurrentTime(e);
    }, [setCurrent, audio]);
    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, []);
    const handleMouseDown = useCallback(() => {
        mouseDown.current = true;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const currentSeconds = Math.floor(current / 1000);
    const currentTime = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    const percentage = (current / DURATION) * 100;
    return(
        <>
            <div className={styles['progress']}>
                <div 
                    className={styles['progress-bar']}
                    onMouseDown={handleMouseDown}
                    onClick={changeCurrentTime}
                    ref={container}
                >
                    <div className={styles['bar']} />
                    <div 
                        className={styles['bar'] + ' ' + styles['filled']}
                        style={{width: `${percentage}%`}}
                    />
                    <div 
                        style={{left: `${percentage - 2}%`}}
                        className={styles['dot']}
                    />
                </div>
                <div className={styles['progress-time']}>
                    <span>
                        0:{currentTime}
                    </span>
                    <span>
                        0:{Math.floor(DURATION / 1000)}
                    </span>
                </div>
            </div>
            <div className={styles['control-buttons']}>
                <PlayerButton 
                    icon={<ShuffleIcon />}
                    ariaHidden={true}
                />
                <PlayerButton 
                    icon={<ReverseIcon />}
                    ariaHidden={true}
                />
                <PlayerButton 
                    icon={playing ? <PauseIcon /> : <PlayIcon />}
                    ariaLabel={playing ? 'Pause preview' : 'Play preview'}
                    onClick={play}
                    style={{ 
                        pointerEvents: errored ? 'none' : 'all',
                        cursor: errored ? 'default' : 'pointer'
                    }}
                />
                <PlayerButton 
                    icon={<ReverseIcon />}
                    ariaHidden={true}
                    style={{ transform: 'rotate(180deg)' }}
                />
                <PlayerButton 
                    icon={<RepeatIcon />}
                    ariaHidden={true}
                />
            </div>
        </>
    )
}