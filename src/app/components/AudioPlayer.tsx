'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import ToggleButton from './AudioBtns';
import { TrackProps } from '../interfaces/audioTypes';



const AudioPlayer = (track : TrackProps) => {
    const [sound, setSound] = useState<Howl | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragProgress = useRef(0);

    useEffect(() => {
        const newSound = new Howl({
            src: [track.src],
            volume: 0.5,
            loop: false,
            onplay: () => setIsPlaying(true),
            onpause: () => setIsPlaying(false),
            onend: () => setIsPlaying(false),
            onload: function () {
                setDuration(Math.floor(newSound.duration()));
            }
        });
        setSound(newSound);

        return () => {
            newSound.unload();
        };
    }, [track.src]);

    useEffect(() => {
        if (!sound) return;

        const updateProgress = () => {
            if (!isDragging.current) {
                const currentSeek = sound.seek() as number;
                setCurrentTime(Math.floor(currentSeek));
                setProgress((currentSeek / duration) * 100);
            }
        };

        const timer = setInterval(updateProgress, 1000);

        return () => clearInterval(timer);
    }, [sound, duration]);

    const togglePlay = () => {
        if (sound) {
            if (isPlaying) {
                sound.pause();
            } else {
                sound.play();
            }
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current && progressBarRef.current && sound && duration > 0) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const newProgress = Math.min(Math.max(0, offsetX / rect.width), 1);
            dragProgress.current = newProgress;
            // const newTime = newProgress * duration;
            setProgress(newProgress * 100);
            // 不改变 currentTime 或 sound.seek()，仅更新视觉反馈
        }
    };

    const handleMouseUp = () => {
        if (isDragging.current && sound) {
            isDragging.current = false;
            const newTime = dragProgress.current * duration;
            sound.seek(newTime);
            setCurrentTime(newTime);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && sound && duration > 0) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const newProgress = Math.min(Math.max(0, offsetX / rect.width), 1);
            const newTime = newProgress * duration;
            sound.seek(newTime);
            setCurrentTime(newTime);
            setProgress(newProgress * 100);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [duration, sound]);

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <span>{track.title}</span>
            <ToggleButton isPlaying={isPlaying} togglePlay={togglePlay} />
            <div
                ref={progressBarRef}
                className="w-full bg-gray-200 h-2 rounded-full mt-4 cursor-pointer select-none"
                onMouseDown={handleMouseDown}
                onClick={handleProgressClick}
            >
                <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
                <label>{formatTime(currentTime)}</label>
                <label>{formatTime(duration)}</label>
            </div>
        </div>
    );
};

export default AudioPlayer;