import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../../actions/jobActions';
import Filters from './Filters';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    lowestPay: '',
    highestPay: '',
    type: '',
    city: '',
    homeOffice: false,
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {

    };
    if (filters.lowestPay) {
      params['salaryFrom[$gt]'] = Number(filters.lowestPay);
    }
    if (filters.highestPay) {
      params['salaryTo[$lt]'] = Number(filters.highestPay);
    }
    if (searchQuery) {
      params['company[$like]'] = `%${searchQuery}%`;
    }
    if (filters.type) {
      params['type'] = filters.type;
    }
    if (filters.city) {
      params['city'] = filters.city;
    }
    if (filters.homeOffice) {
      params['homeOffice'] = true;
    }

    console.log(params);
    dispatch(fetchJobs(params));
  };
  return (
    <>
      <style>
        {`
          .search {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
          }
          .searchBar {
            padding: 0;
          }
          .searchButton {
            margin-right: 1rem;
            margin-left: 1rem;
          }
            form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="number"],
  input[type="text"],
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  input[type="checkbox"] {
    margin-left: 10px;
  }
  button {
    padding: 10px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: #28a745;
    color: white;
  }
  button[type="button"] {
    background-color: #dc3545;
    color: white;
  }
        `}
      </style>
      <div className='search'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for jobs..."
          className='searchBar'
        />
        <button className='searchButton' onClick={handleSearchSubmit}>Search</button>
        <button onClick={toggleFilters}>Filters</button>
        {showFilters && <Filters searchQuery={searchQuery} filters={filters} setFilters={setFilters} setSearchQuery={setSearchQuery} />}
      </div>
    </>
  );
};
export default SearchBar;
