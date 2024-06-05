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
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for jobs..."
        />
        <button onClick={handleSearchSubmit}>Search</button>
        <button onClick={toggleFilters}>Filters</button>
        {showFilters && <Filters searchQuery={searchQuery} filters={filters} setFilters={setFilters} />}
      </div>
    </>
  );
};
export default SearchBar;
