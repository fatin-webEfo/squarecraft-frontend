import { useContext } from "react";
import { motion } from "framer-motion";
import useTitle from "../../../hooks/useTitle";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPlugCirclePlus } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router";
import ButtonLoader from './../../../hooks/ButtonLoader/ButtonLoader';

const MyWebsite = () => {
    useTitle("My Website | SquareCraft");
    const { user, myPlugins, postPlugins, setMyPlugins,pluginLoading,postPluginsLoading } = useContext(AuthContext);
    
    console.log("My plugins:", myPlugins);
    console.log("User:", user);

    const squarCraft_auth_token = localStorage.getItem("squarCraft_auth_token");

    const generateInstallationCode = (pluginId) => {
        return `<script id="sc-script"
            src="https://fatin-webefo.github.io/squareCraft-plugin/squareCraft.js"
            data-token="${squarCraft_auth_token}"
            data-u-id="${user?.id}"
            data-w-id="${pluginId}"
            defer
            ></script>`;
    };

    const updatePluginState = (pluginId, newState) => {
        setMyPlugins(prevPlugins =>
            prevPlugins.map(plugin =>
                plugin._id === pluginId ? { ...plugin, ...newState } : plugin
            )
        );
    };

    const copyToClipboard = async (pluginId) => {
        try {
            const installationCode = generateInstallationCode(pluginId); 
            await navigator.clipboard.writeText(installationCode);

            updatePluginState(pluginId, { copied: true, loading: true });

            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

            updatePluginState(pluginId, { copied: false, loading: false });

        } catch (error) {
            console.error("❌ Copy Error:", error);
        }
    };

    const addPlugin = async () => {
        await postPlugins();
    };

    return (
        <div className="bg-white pt-10 pb-20 px-6 md:px-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center pb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Install SquareCraft on Your Website
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-600">
                    Add this script inside the <span className="font-bold">HEADER</span> section.
                </p>
            </motion.div>

            <div> 
            {
                pluginLoading ? (<><div className="w-[28rem] mt-4 mx-auto h-14 rounded-2xl animate-pulse bg-orange-100"></div>
                                  </>) : (<>{myPlugins?.map((plugin) => (
                    <motion.div
                        key={plugin._id}
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
                                    value={plugin.pluginName}
                                    onChange={(e) => {
                                        const newPlugins = myPlugins?.map((p) =>
                                            p._id === plugin._id ? { ...p, pluginName: e.target.value } : p
                                        );
                                        setMyPlugins(newPlugins);
                                    }}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="gap-2 flex items-center">
                                        {user ? (
                                            <>
                                                <button
                                                    onClick={() => copyToClipboard(plugin._id)}
                                                    className={`w-full lg:w-[12rem] py-3 rounded-2xl text-white shadow-md text-center mx-auto text-sm transition duration-300 ease-in-out transform hover:scale-105 
                                                        ${plugin.copied ? "bg-orange-600" : "bg-gradient-to-r from-jaffa-400 to-orange-600 hover:bg-gradient-to-l hover:from-jaffa-500 hover:to-orange-600"}`}
                                                >
                                                    {plugin.loading ? "Copying..." : plugin.copied ? "Copied!" : "Copy Installation Code"}
                                                </button>
                                                <HiOutlineDotsVertical className="items-end ml-auto" />
                                            </>
                                        ) : (
                                            <Link to="/auth/login" className="gap-2 flex items-center">
                                                <button
                                                    className="w-full lg:w-[12rem] py-3 rounded-2xl text-white shadow-md text-center mx-auto text-sm transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-jaffa-400 to-orange-600 hover:bg-gradient-to-l hover:from-jaffa-500 hover:to-orange-600"
                                                >
                                                    Sign In to Copy
                                                </button>
                                                <HiOutlineDotsVertical className="items-end ml-auto" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}</>)
            }
            </div>
            {
                postPluginsLoading && (<div className="mx-auto mt-4"><ButtonLoader/></div>)
            }
          

            <button
                onClick={addPlugin}
                className="flex cursor-pointer mx-auto rounded-xl px-4 py-1.5 hover:border-b hover:border-gray-300 transition-all duration-300 items-center justify-center mt-4 text-sm text-gray-500 gap-1.5"
            >
                <FaPlugCirclePlus />
                <p className="text-gray-500">Add New Plugin</p>
            </button>

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
