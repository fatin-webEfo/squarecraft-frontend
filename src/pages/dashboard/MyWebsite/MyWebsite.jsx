
import PlusIcon from "../../../hooks/plusIcon/plusIcon";
import useTitle from "../../../hooks/useTitle";
import MyWwebsiteFetch from "./MyWwebsiteFetch";

const MyWebsite = () => {
    useTitle("My Website | SquareCraft");
    return (
        <div className="mt-32 bg-white py-10">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <p className="text-[28px] font-semibold">My Website</p>
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-[2.6rem] w-[8.5rem] group hover:bg-jaffa-400  cursor-pointer gap-3 border border-jaffa-400 rounded">
                        <p className="text-jaffa-400 text-sm group-hover:text-white transition-all duration-300">
                            Add Website
                        </p>
                        <div className="flex items-center">
                            <PlusIcon
                                fill="currentColor"
                                className="text-[#F08234] w-3 group-hover:text-white transition-all duration-300"
                            />
                        </div>

                    </div>
                    <div className="bg-jaffa-400 group hover:border hover:border-jaffa-400 transition-all cursor-pointer border border-jaffa-400 duration-300 hover:bg-white text-sm flex  h-[2.6rem] w-[8.5rem]   justify-center rounded items-center gap-2.5">
                        <p className="transition-all duration-300 group-hover:text-jaffa-400">What&apos;s New</p>
                        <p className="rounded-full transition-all duration-300 bg-white px-1 group-hover:bg-jaffa-400 text-sm py-[3px]">02</p>
                    </div>
                </div>

            </div>
            <div className="border-b border-dashed border-gray-300 max-w-7xl mx-auto w-full mt-10"></div>

            <div className="flex  justify-between w-full max-w-7xl mx-auto  flex-col items-start gap-4 mt-8">
              <MyWwebsiteFetch/>
            </div>
        </div>
    );
};

export default MyWebsite;
