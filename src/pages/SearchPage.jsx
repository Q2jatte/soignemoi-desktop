// Search page: search patient by name

import Menu from "../components/Menu";
import Search from "../components/Search";

import '../css/flux.css';

function SearchPage() {    
  
  return (
    <div className="main">
      <Menu/>
      <Search/>
    </div>
  );
}

export default SearchPage;