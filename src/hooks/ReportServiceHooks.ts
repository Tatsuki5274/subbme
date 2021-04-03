import { useState } from "react";

export function useRate(){
    const [isGood, setIsGood] = useState<boolean>(false);
    const [isBad, setIsBad] = useState<boolean>(false);
    const [rate, setRate] = useState<number>(0);
    const clickGood = () => {
        if(isGood) {
            setRate(0);
        } else {
            setRate(2);
        }
        setIsBad(false);
        setIsGood(!isGood);
    };
    const clickBad = () => {
        if(isBad) {
            setRate(0);
        } else {
            setRate(-2);
        }
        setIsGood(false);
        setIsBad(!isBad);
    };

    return {
        isGood,
        isBad,
        rate,
        clickGood,
        clickBad
    }
}