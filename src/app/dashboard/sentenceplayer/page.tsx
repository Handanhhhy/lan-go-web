import { songs } from "@/app/components/audioData";
import SentencePlayer from "@/app/components/SentencePlayer";

const Page = () => {
    return (
        <div>
            <SentencePlayer src={songs[2].src} title={songs[2].title} dataUrl={songs[2].dataUrl}></SentencePlayer>
        </div>
    );
};

export default Page;

