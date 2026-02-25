import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Search2 = () => {
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
    <header className="w-full h-18 lg:h-20 pt-1 flex items-center justify-center sticky top-0 lg:top-17 left-0 z-40 bg-white">
      <div className="flex gap-1 lg:gap-1.5 w-full mx-2 md:mx-6 lg:mx-6">  
        <div className="bg-gray-100/80 flex-1 rounded-xl py-3 md:py-3.5 lg:py-3.5">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Search an apartment..."
            className="w-full h-full pl-4 bg-transparent outline-none text-base lg:text-lg font-semibold text-gray-900 placeholder-gray-400" 
          />
        </div>
        <div className="bg-gray-100/80 rounded-xl py-3 px-4 flex items-center justify-center cursor-pointer">
          <SearchIcon 
            onClick={handleSearch}
            size={20} 
            strokeWidth={3} 
            className="text-gray-400" 
          />
        </div>
      </div>
    </header>
  );
};

export default Search2;
