import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const Search = () => {
  return (
    <header className="w-full h-20 pt-4 flex items-center justify-center fixed top-12 left-0 z-40 bg-white">
      <div className="relative bg-white w-11/12 h-10/12 shadow-[0_5px_15px_0_rgba(0,0,0,0.15)] rounded-xl">  
        <input
          type="text"
          placeholder="Search an apartment..."
          className="w-full h-full pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-gray-400" 
        />
        <MagnifyingGlassIcon className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-slate-700 cursor-pointer" />
      </div>
    </header>
  );
};

export default Search;
