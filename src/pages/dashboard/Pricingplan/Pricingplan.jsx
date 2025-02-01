
import { motion } from "framer-motion";
const Pricingplan = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[86vh] text-center px-6">
    {/* Animated Text */}
    <motion.h1
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-bold text-gray-900"
    >
      Plugin Libraries <span className="animate-bounce inline-block">🚀</span>
    </motion.h1>

    {/* Subtitle with a delay */}
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="text-gray-600 text-lg md:text-xl mt-4"
    >
      Exciting new features are on the way! Stay tuned. ⚡️
    </motion.p>

    {/* Coming Soon GIF */}
    <motion.img
      src="https://media2.giphy.com/media/SiLYjT3J1x4oGCIBGD/source.gif"
      loading="lazy"
      alt="Coming Soon"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="w-[300px] md:w-[400px] mt-6"
    />

    {/* Animated Button for Fun */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="mt-6 px-6 py-3 bg-jaffa-400 hover:bg-orange-700 text-white text-lg font-medium rounded-xl transition-all shadow-md"
    >
      Notify Me 🔔
    </motion.button>
  </div>
  )
}

export default Pricingplan
