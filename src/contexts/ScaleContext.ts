import React from "react";

export type ScaleContextType = {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
};

const ScaleContext = React.createContext<ScaleContextType>({
    scale: 1,
    setScale: () => {},
});

export default ScaleContext;
