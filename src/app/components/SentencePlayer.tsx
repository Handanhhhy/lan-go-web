// SentencePlayer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Howl, SoundSpriteDefinitions } from 'howler';
import ToggleButton from './AudioBtns';
import { AudioSegment, TrackProps } from '../interfaces/audioTypes';
import './styles.css'

interface MarqueeTextProps {
    currentIndex: number;
    windowSize: number;
}


const SentencePlayer = (track: TrackProps) => {
    const [sound, setSound] = useState<Howl | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingLogic = useRef(false);
    const [audioSegments, setAudioSegments] = useState<AudioSegment[]>([]);

    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [prevId, setPrevId] = useState<number | null>(null);

    const [delay, setDelay] = useState(3000);
    const [inputValue, setInputValue] = useState('3000');

    useEffect(() => {
        const fetchAudioSegments = async () => {
            try {
                const response = await fetch(track.dataUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch audio segments');
                }
                const data: AudioSegment[] = await response.json();
                setAudioSegments(data);
            } catch (error) {
                console.error('Error fetching audio segments:', error);
            }
        };

        fetchAudioSegments();
    }, [track.dataUrl]);

    useEffect(() => {
        if (audioSegments.length > 0) {
            const soundSpriteDefinitions: SoundSpriteDefinitions = audioSegments.reduce((acc, segment, index) => {
                acc[`sentence${index + 1}`] = segment.sprite;
                return acc;
            }, {} as SoundSpriteDefinitions);

            const newSound = new Howl({
                src: [track.src], // Use the actual track source
                sprite: soundSpriteDefinitions,
                onload: function () {
                    setDuration(Math.floor(newSound.duration()));
                }
            });

            setSound(newSound);

            return () => {
                newSound.unload();
            };
        }
    }, [audioSegments, track.src]);

    const MarqueeText = ({ currentIndex, windowSize }: MarqueeTextProps) => {
        if (currentIndex < 0 || currentIndex >= audioSegments.length) {
            return <div className="marquee-content">Invalid index</div>;
        }

        const start = Math.max(0, currentIndex - Math.floor(windowSize / 2));
        const end = Math.min(audioSegments.length, start + windowSize);

        return (
            <div className="marquee">
                {audioSegments.slice(start, end).map((segment, index) => (
                    <div
                        key={segment.id}
                        className={`marquee-content ${index + start === currentIndex ? 'current' : ''}`}
                    >
                        {segment.text}
                    </div>
                ))}
            </div>
        );
    };


    const playSegment = async (key: number) => {
        if (!sound) return;

        const currentSegment = audioSegments[key];
        if (currentSegment) {
            console.log(`sentence${key + 1}`);
            const id = sound.play(`sentence${key + 1}`); // 使用适当的 sprite key
            setPrevId(id);
            sound.on("end", () => {
                if (isPlayingLogic.current) {
                    setTimeout(() => {
                        if (isPlayingLogic.current) {
                            skipForward();
                        }
                    }, delay)
                }
            }, id);

        }
    };

    useEffect(() => {
        if (isPlaying && currentIndex < audioSegments.length) {
            pausePrev();
            playSegment(currentIndex);
        }
    }, [isPlaying, currentIndex])

    const updateProgress = (spriteId: number) => {
        if (!sound) return;
        const currentSeek = sound.seek(spriteId) as number;
        setCurrentTime(Math.floor(currentSeek));
        setProgress((currentSeek / duration) * 100);
        setPrevId(spriteId); // Update prevId with the current spriteId
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (prevId !== null) {
                updateProgress(prevId);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound, duration, prevId]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const pausePrev = () => {
        if (sound) {
            sound.pause(prevId || undefined);
        }
    }


    const togglePlay = () => {
        if (sound) {
            if (isPlaying) {
                console.log("toggle stop");
                pausePrev();
                setIsPlaying(false);
                isPlayingLogic.current = false;
            } else {
                console.log("toggle play");
                setIsPlaying(true);
                isPlayingLogic.current = true;
            }
        }
    };

    const skipForward = () => {
        if (currentIndex < audioSegments.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
            isPlayingLogic.current = true;
        }
    };

    const skipBackward = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsPlaying(true);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const updateDelay = () => {
        const parsedValue = parseInt(inputValue, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setDelay(parsedValue);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">

            <MarqueeText currentIndex={currentIndex} windowSize={5}></MarqueeText>
            <div className="w-full flex items-center justify-between mb-4">
                <button onClick={skipBackward} >
                    <i className="fas fa-backward">backward</i>
                </button>

                <ToggleButton isPlaying={isPlaying} togglePlay={togglePlay} />


                <button onClick={skipForward} >
                    <i>forward</i>
                </button>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded mb-2">
                <div className="bg-blue-500 h-1 rounded" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between w-full text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
            <i>        {isPlaying ? 'Pause' : 'Play'}</i>
            <div>
                <label>
                    Set Delay (ms):
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={updateDelay}
                    />
                </label>
                <p>Current delay: {delay} ms</p>
            </div>
        </div>
    );
};

export default SentencePlayer;
