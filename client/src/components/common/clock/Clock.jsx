import "./clock.css";
import { useEffect, useRef, useState } from 'react';

const Clock = ({ timerStopHandle }) => {
    const renderedTime = useRef(new Date());
    const [secondsElasped, setSecondsElasped] = useState(0);
    var interval;

    const secondHand = useRef(null);
    useEffect(() => {
        timerStopHandle.current = stopTimer;
        interval = setInterval(setClock, 30);
        return () => clearInterval(interval);
    }, []);

    function stopTimer() {
        if (interval) {
            clearInterval(interval);
        }
    }

    function setClock() {
        const currentDate = new Date();
        const secondsRatio = currentDate.getMilliseconds() / 1000;
        setRotation(secondHand.current, secondsRatio);
        setElaspedTime();
    }

    function setElaspedTime() {
        setSecondsElasped(Math.round((new Date() - renderedTime.current) / 1000));
    }

    function setRotation(element, rotationRatio) {
        element.style.setProperty('--rotation', rotationRatio * 360);
    }

    return (
        <div>
            <div className="clock" onDoubleClick={(e) => stopTimer()}>
                <div className="hand second" ref={secondHand}></div>
                <div className="number number3"><div className="digit3">3</div></div>
                <div className="number number6"><div className="digit6">6</div></div>
                <div className="number number9"><div className="digit9">9</div></div>
                <div className="number number12">12</div>
                <div className="elapsed">{secondsElasped}s</div>
            </div>
        </div>
    );
}

export default Clock;
