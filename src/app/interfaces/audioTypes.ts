import { SoundSpriteDefinitions } from 'howler';

export interface TrackProps {
    src: string;
    title: string;
    artist?: string;
    album?: string;
    duration?: string | number;
    imageUrl?: string;
    sprite?: SoundSpriteDefinitions;
    dataUrl: string;
}

export type AudioSegment = {
    id: number,
    sprite: [number, number];
    text: string;
};

export interface MarqueeTextProps {
    index: number;
}
