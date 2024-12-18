import { songs } from "@/app/components/audioData";
import AudioPlayer from "@/app/components/AudioPlayer";

const Page = () => {
    return (
        <div>
            <AudioPlayer src={songs[0].src} title={songs[0].title} dataUrl={songs[0].dataUrl}></AudioPlayer>
        </div>
    );
};

export default Page;
