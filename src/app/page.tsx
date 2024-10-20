import React from 'react';
import AudioPlayer from './components/AudioPlayer';

const songs = [
    {
        src: "/bfsdla.mp3",
        title: "不分手的恋爱"
    },
    {
        src: "/80s_vibe.mp3",
        title: "80s_vibe"
    },
    {
        src: "/test.mp3",
        title: "six minutes english"
    },
]


const HomePage = () => {
    return (
        <div>
            <AudioPlayer src={songs[0].src} title={songs[0].title}></AudioPlayer>
        </div>
    );
};

export default HomePage;
