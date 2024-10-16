'use client'
import React, { useState } from 'react';
import { Howl } from 'howler';
import ToggleButton from './AudioBtns';

const AudioView = () => {
    const [sound, setSound] = useState<Howl | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!sound) {
            const newSound = new Howl({
                src: '/80s_vibe.mp3',
            });
            setSound(newSound);
            newSound.play();
            console.log("new");
        } else {
            if (isPlaying) {
                sound.pause();
            } else {
                sound.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <ToggleButton isPlaying={isPlaying} togglePlay={togglePlay}></ToggleButton>
        </div>
    );
};

export default AudioView;
