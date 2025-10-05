import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center py-3 mt-[88px] sm:mt-[90px]">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src="frontend_assets/search_icon.png" alt="search-icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src="frontend_assets/cross_icon.png"
        alt="close search"
      />
    </div>
  ) : null;
};

export default SearchBar;
