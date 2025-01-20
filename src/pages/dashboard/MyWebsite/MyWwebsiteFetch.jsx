import { useState, useEffect, useMemo, useCallback } from "react";
import image1 from "../../../../public/Statics/myWebsite (1).png";
import image2 from "../../../../public/Statics/myWebsite (2).png";
import image3 from "../../../../public/Statics/myWebsite (3).png";
import Image from "../../../hooks/Image/Image";
import InstallationDrawer from "../../../hooks/InstallationDrawer/InstallationDrawer";

const MyWebsiteFetch = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(localStorage.getItem("currentPage")) || 1;
  });

  const handleOpenDrawer = useCallback(() => setDrawerOpen(true), []);
  const handleCloseDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const data = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        image: index % 3 === 0 ? image1 : index % 3 === 1 ? image2 : image3,
        title: `Website ${index + 1}`,
        plan: index % 3 === 0 ? "Pro Plan" : index % 3 === 1 ? "Basic Plan" : "Starter Plan",
        plugins: index % 3 === 0 ? 15 : index % 3 === 1 ? 10 : 5,
        date: `25-06-2025`,
        daysLeft: 150 - index,
      })),
    []
  );

  const itemsPerPage = 8;
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, currentPage, itemsPerPage]);

  const renderPagination = useCallback(() => {
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-jaffa-400 text-white hover:bg-jaffa-500"
        }`}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              currentPage === i ? "bg-jaffa-400 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            currentPage === 1 ? "bg-jaffa-400 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="dots-left" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              currentPage === i ? "bg-jaffa-400 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="dots-right" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }

      // Show last page
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-4 py-2 rounded-md transition-all duration-300 ${
            currentPage === totalPages ? "bg-jaffa-400 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // "Next" button
    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-jaffa-400 text-white hover:bg-jaffa-500"
        }`}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    );

    return buttons;
  }, [currentPage, totalPages]);

  return (
    <>
      {currentItems.map((item) => (
        <div key={item.id} className="w-full border rounded-md gap-2 grid grid-cols-12 border-gray-200 p-3">
          <div className="col-span-2 w-full">
            <Image src={item.image} className="w-full object-cover border rounded-md h-full" />
          </div>
          <div className="col-span-10 px-4 w-full">
            <div className="flex flex-col items-start w-full h-full justify-between">
              <div className="w-full">
                <div className="flex items-center gap-5 mt-2">
                  <p className="text-jaffa-400 font-semibold">{item.plan}</p>
                  <p className="px-4 py-1 rounded-2xl text-sm bg-orange-50 text-jaffa-400">{item.plugins} plugin available</p>
                </div>
                <div className="border-b border-dashed border-gray-300 mt-3 mx-auto w-full"></div>
                <p className="text-[32px] mt-1.5 font-semibold">{item.title}</p>
              </div>
              <div className="w-full flex items-end justify-between">
                <div className="flex flex-col text-sm items-start gap-1">
                  <p className="text-gray-400">Subscription Date:</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{item.date}</p>
                    <p className="text-red-500">({item.daysLeft} Days Left to Expire)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <button className="bg-jaffa-400 rounded-md px-5 py-2 group hover:bg-white hover:text-jaffa-400 border border-jaffa-400 duration-300 transition-all">
                    Upgrade Plan
                  </button>
                  <button
                    onClick={handleOpenDrawer}
                    className="text-jaffa-400 border border-jaffa-400 rounded-md px-5 py-2 group duration-300 transition-all hover:bg-jaffa-400 hover:text-black"
                  >
                    Installation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex text-sm w-full items-center justify-end mt-6 gap-2">
        {renderPagination()}
      </div>

      {/* Drawer */}
      <InstallationDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <p>This is the content inside the drawer.</p>
      </InstallationDrawer>
    </>
  );
};

export default MyWebsiteFetch;
