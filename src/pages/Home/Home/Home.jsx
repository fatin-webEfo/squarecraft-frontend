import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sampleVideo from "../../../../public/Statics/sampleVideo.mp4";
import { useRef } from "react";
const Home = () => {
  const storedUser = localStorage.getItem("squarCraft_user");
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Cursor X relative to the element
    const y = e.clientY - rect.top;  // Cursor Y relative to the element
    const centerX = rect.width / 2; // Center of the element (X-axis)
    const centerY = rect.height / 2; // Center of the element (Y-axis)

    const rotateX = ((y - centerY) / centerY) * 15; // RotateX based on Y
    const rotateY = ((x - centerX) / centerX) * -15; // RotateY based on X

    textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    textRef.current.style.textShadow = `
      ${-rotateY * 1.5}px ${rotateX * 1.5}px 10px rgba(0, 0, 0, 0.2),
      ${-rotateY * 2}px ${rotateX * 2}px 20px rgba(0, 0, 0, 0.15)
    `;
  };

  const handleMouseLeave = () => {
    textRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    textRef.current.style.textShadow = `
      2px 2px 3px rgba(0, 0, 0, 0.3),
      4px 4px 6px rgba(0, 0, 0, 0.2),
      6px 6px 8px rgba(0, 0, 0, 0.1)
    `;
  };

    return (
        <div className="bg-white pt-16 pb-20 px-6 md:px-12">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Elevate Your Squarespace Website
                    </h1>
                    <p
      ref={textRef}
      className="gradient-text mt-8 text-md text-gray-600 max-w-3xl mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Customize your website like never before with <span>SquareCraft</span>.
      Easily install and modify your Squarespace site without coding!
    </p>



                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 flex justify-center gap-4"
                    >
                        <Link to={`${storedUser ? "/dashboard/myWebsites" : "/auth/login"}`}>
                            <button className="px-6 py-3 bg-jaffa-400 hover:bg-orange-700 text-white text-lg font-medium rounded-xl transition-all shadow-md">
                                Get Started
                            </button>
                        </Link>
                        <a href="#features">
                            <button className="px-6 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 text-lg font-medium rounded-xl transition-all">
                                Learn More
                            </button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    id="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16"
                >
                    <h2 className="text-3xl font-semibold text-center text-gray-900">
                        Why Choose SquareCraft?
                    </h2>
                    <p className="text-gray-500 text-center mt-2">
                        Powerful, easy-to-use features to customize your website effortlessly.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800">Live Editing</h3>
                            <p className="text-gray-500 mt-2">
                                Modify your Squarespace site in real-time with our live styling tool.
                            </p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800">No Coding Required</h3>
                            <p className="text-gray-500 mt-2">
                                Customize colors, fonts, and layouts without touching a single line of code.
                            </p>
                        </div>
                        <div className="p-6 border rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800">One-Click Installation</h3>
                            <p className="text-gray-500 mt-2">
                                Just paste our script, and you’re ready to enhance your site.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-2xl font-semibold text-gray-800">Start Customizing Today!</h2>
                    <p className="text-gray-500 mt-2">Install SquareCraft in seconds and take control of your Squarespace site.</p>

                    <Link to="/my-website">
                        <button className="mt-6 px-6 py-3 bg-jaffa-400 hover:bg-orange-700 text-white text-lg font-medium rounded-xl transition-all shadow-md">
                            Get Started Now
                        </button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16"
                >
                </motion.div>



            </div>
            <hr className="mt-40 block"/>
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-36 flex items-center max-w-7xl mx-auto justify-between"
>
  {/* Left Section */}
  <div className="w-full md:w-1/2 px-6">
    <h2 className="text-4xl font-semibold text-gray-900">
      This is how easy it is to use SquareCraft
    </h2>
    <p className="text-lg max-w-lg text-gray-600 mt-4">
      See how SquareCraft changed this Squarespace template design into something truly modern and unique - in just one minute.
    </p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-6"
    >
      <button className="px-6 py-3 bg-jaffa-400 hover:bg-orange-700 text-white text-lg font-medium rounded-xl transition-all shadow-md">
        Watch Demo
      </button>
    </motion.div>
  </div>

  {/* Right Section with Video */}
  <div className="w-full md:w-1/2 h-full">
    <video
      className="w-full h-full object-cover rounded-lg"
      src={sampleVideo}
      autoPlay
      muted
      loop
    />
  </div>
</motion.div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-36 flex items-center max-w-7xl mx-auto w-full justify-between"
>
  {/* Left Section with Video */}
  <div className="w-full md:w-1/2 h-full">
    <video
      className="w-full h-full object-cover rounded-lg"
      src={sampleVideo} // Ensure you replace 'sampleVideo' with the correct video path
      autoPlay
      muted
      loop
    />
  </div>

  {/* Right Section with Text and Button */}
  <div className="w-full ml-auto text-right md:w-1/2 px-6">
    <h2 className="text-4xl font-semibold text-gray-900">
      This is how easy it is to use SquareCraft
    </h2>
    <p className="text-lg  text-gray-600 mt-4">
      See how SquareCraft changed this Squarespace template design into something truly modern and unique - in just one minute.
    </p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-6"
    >
      <button className="px-6 py-3 bg-jaffa-400 hover:bg-orange-700 text-white text-lg font-medium rounded-xl transition-all shadow-md">
        Watch Demo
      </button>
    </motion.div>
  </div>
</motion.div>



        </div>
    );
};

export default Home;
