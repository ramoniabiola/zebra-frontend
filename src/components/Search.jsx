import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };




  return (
    <header className="w-full h-20 pt-4 flex items-center justify-center fixed top-12 left-0 z-40 bg-white">
      <div className="relative bg-white w-11/12 h-10/12 shadow-[0_5px_15px_0_rgba(0,0,0,0.15)] rounded-xl">  
        <input
          value={searchQuery}
          
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Search an apartment..."
          className="w-full h-full pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-gray-400" 
        />
        <SearchIcon 
          onClick={handleSearch}
          size={24} 
          strokeWidth={3} 
          className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-slate-400 cursor-pointer" 
        />
      </div>
    </header>
  );
};

export default Search;
