import { SearchIcon } from "lucide-react";


const Search2 = () => {
  return (
    <header className="w-full h-20 pt-4 flex items-center justify-center fixed top-0 left-0 z-40 bg-white">
      <div className="relative bg-gray-100 border border-gray-200  w-11/12 h-10/12 rounded-xl">  
        <input
          type="text"
          placeholder="Search an apartment..."
          className="w-full h-full pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-gray-400" 
        />
        <SearchIcon size={24} strokeWidth={3} className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-gray-400 cursor-pointer" />
      </div>
    </header>
  );
};

export default Search2;
