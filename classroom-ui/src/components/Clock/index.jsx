import React from 'react';
import './clock.scss';

import Watch from './components/Watch';

const Clock = () => {

    const [time, setTime] = React.useState(new Date());

    const tick = () => {
        setTime(new Date());
    }

    React.useEffect(() => {
      const interval = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
        <div className="clock">
            <Watch time={time} />
        </div>
    );
}

export default Clock;
