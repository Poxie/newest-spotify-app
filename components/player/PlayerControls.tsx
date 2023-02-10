import styles from './Player.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePlayer } from './PlayerMain';

const DURATION = 30 * 1000;
export const PlayerControls = () => {
    const { togglePlay, playing, setTime, audio } = usePlayer();
    const [current, setCurrent] = useState(0);
    const container = useRef<HTMLDivElement>(null);
    const mouseDown = useRef(false);

    // Making sure to reset player on end
    useEffect(() => {
        if(!audio) return;

        // On audio first play, reset track
        setCurrent(0);

        // Resetting track on end
        const onEnd = () => setCurrent(0);
        
        audio.addEventListener('ended', onEnd);
        return () => audio.removeEventListener('ended', onEnd);
    }, [audio]);

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
            if(interval) clearInterval(interval);
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

        // If player is loading, setTime will be undefined
        if(setTime) {
            setTime(currentTime / 1000);
        }
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
    )
}