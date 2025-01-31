import { useContext, useState } from "react";
import { motion } from "framer-motion";
import useTitle from "../../../hooks/useTitle";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPlugCirclePlus } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthContext";

const MyWebsite = () => {
    useTitle("My Website | SquareCraft");
    const { user, loading, error } = useContext(AuthContext);
    const installationCode = `<script  id="squarecraft-script" src="https://fatin-webefo.github.io/squarecraft-frontend/src/pages/PluginTest/ParentWidget/ParentWidget.js" data-token="${
      user?.user_id ? user?.user_id : user?.id 
    }" defer></script>`;

    const [plugins, setPlugins] = useState([{ id: 1, name: "", copied: false }]);

    const copyToClipboard = (pluginId) => {
        navigator.clipboard.writeText(installationCode);
        setPlugins(prevPlugins =>
            prevPlugins.map(plugin =>
                plugin.id === pluginId ? { ...plugin, copied: true } : plugin
            )
        );
        setTimeout(() => {
            setPlugins(prevPlugins =>
                prevPlugins.map(plugin =>
                    plugin.id === pluginId ? { ...plugin, copied: false } : plugin
                )
            );
        }, 2000);
    };

    const addPlugin = () => {
        setPlugins([...plugins, { id: plugins.length + 1, name: "", copied: false }]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-white pt-10 pb-20 px-6 md:px-12">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center pb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Install SquareCraft on Your Website
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-600 ">
                    Add this script inside the <span className="font-bold">HEADER</span> section.
                </p>
            </motion.div>

            {/* Plugins List */}
            {plugins?.map((plugin) => (
                <motion.div
                    key={plugin.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-3.5 flex justify-center"
                >
                    <div className="flex items-center justify-between gap-5 border shadow-sm shadow-gray-300 py-2 pl-5 lg:w-[28rem] pr-2.5 rounded-2xl">
                        <div>
                            <input
                                type="text"
                                placeholder="Your plugin name"
                                className="w-full py-1 focus:outline-none"
                                value={plugin.name}
                                onChange={(e) => {
                                    const newPlugins = plugins.map((p) => p.id === plugin.id ? { ...p, name: e.target.value } : p);
                                    setPlugins(newPlugins);
                                }}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(plugin.id)}
                                    className={`w-full lg:w-[12rem] py-3 rounded-2xl text-white shadow-md text-center mx-auto text-sm transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-jaffa-400 to-orange-600 hover:bg-gradient-to-l hover:from-jaffa-500 hover:to-orange-600 ${plugin.copied ? "bg-green-600" : "bg-gradient-to-r from-jaffa-400 to-orange-600 hover:bg-gradient-to-l hover:from-jaffa-500 hover:to-orange-600"
                                        }`}
                                >
                                    {plugin.copied ? "Copied!" : "Copy Installation Code"}
                                </button>
                                <HiOutlineDotsVertical className="items-end ml-auto" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Add More Plugin Button */}
            <button
                onClick={addPlugin}
                className="flex cursor-pointer mx-auto rounded-xl px-4 py-1.5 hover:border-b hover:border-gray-300 transition-all duration-300 items-center justify-center mt-4 text-sm text-gray-500 gap-1.5"
            >
                <FaPlugCirclePlus />
                <p className="text-gray-500">Add New Plugin</p>
            </button>

            {/* Video Guide Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 text-center"
            >
                <h2 className="text-2xl font-semibold text-gray-800">How to Install?</h2>
                <p className="text-gray-500 mt-2">Watch this quick guide to set up SquareCraft on your website.</p>

                <div className="mt-6 flex justify-center">
                    <iframe
                        className="w-full max-w-3xl aspect-video rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/5cgpFGVy12Q?si=FLYwRSZpy25HZU-u"
                        title="Installation Guide"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </motion.div>
        </div>
    );
};

export default MyWebsite;
