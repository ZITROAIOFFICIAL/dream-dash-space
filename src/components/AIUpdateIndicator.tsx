import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const AIUpdateIndicator = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative w-5 h-5 flex-shrink-0">
        <Loader2 className="w-5 h-5 text-green-500 animate-spin absolute" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-green-500 font-bold text-[8px]">IA</span>
        </div>
      </div>
      <span className="text-white/70 text-sm">
        Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </div>
  );
};

export default AIUpdateIndicator;
