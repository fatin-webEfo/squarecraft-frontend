import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type, onClose, className = "", icon = null }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-3 p-4 rounded-md text-white text-sm shadow-lg transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"} ${className}`}
    >
      {icon && <img src={icon} alt="icon" className="w-6 h-6" />}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
