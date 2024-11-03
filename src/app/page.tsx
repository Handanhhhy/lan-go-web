import React from 'react';
import AudioPlayer from './components/AudioPlayer';
import SentencePlayer from './components/SentencePlayer';
import { TrackProps } from './interfaces/audioTypes';

const songs: TrackProps[] = [
    {
        src: "/bfsdla.mp3",
        title: "不分手的恋爱",
        dataUrl: "/test.json"
    },
    {
        src: "/80s_vibe.mp3",
        title: "80s_vibe",
        dataUrl: "/test.json"
    },
    {
        src: "/test.mp3",
        title: "six minutes english",
        dataUrl: "/test.json"
    },
]


const HomePage = () => {
    return (
        <div>
            {/* <AudioPlayer src={songs[0].src} title={songs[0].title}></AudioPlayer> */}
            <SentencePlayer src={songs[2].src} title={songs[2].title} dataUrl={songs[2].dataUrl}></SentencePlayer>

        </div>
    );
};

export default HomePage;
