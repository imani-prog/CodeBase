
import { useState, useEffect } from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)  return { text: 'Good morning',    };
  if (hour >= 12 && hour < 17) return { text: 'Good afternoon',  };
  if (hour >= 17 && hour < 21) return { text: 'Good evening',   };
  return                               { text: 'Good night',     };
};

export const useGreeting = () => {
  const [greeting, setGreeting] = useState(getGreeting);

  useEffect(() => {
   
    const tick = () => setGreeting(getGreeting());
    const now  = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    
    const timeout  = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return greeting;
};