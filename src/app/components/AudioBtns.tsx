
interface ToggleButtonProps {
    isPlaying: boolean;
    togglePlay: () => void;
}
const ToggleButton = ({ isPlaying, togglePlay }: ToggleButtonProps) => (
    <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
    </button>
);

export default ToggleButton;
