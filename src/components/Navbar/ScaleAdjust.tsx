import { ChangeEvent, useContext } from "react";
import ScaleContext from "../../contexts/ScaleContext";

function ScaleAdjust() {
    const { scale, setScale } = useContext(ScaleContext);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const numericValue = Number(e.target.value);
        setScale(numericValue);
    }

    return (
        <div>
            <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={scale}
                onChange={onChange}
            />
        </div>
    );
}

export default ScaleAdjust;
