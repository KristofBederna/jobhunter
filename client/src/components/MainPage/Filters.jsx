import { useDispatch } from 'react-redux';
import { fetchJobs } from '../../actions/jobActions';

const Filters = ({ searchQuery, filters, setFilters }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      lowestPay: '',
      highestPay: '',
      jobType: '',
      location: '',
      homeOffice: false,
    });
    dispatch(fetchJobs());
  };
  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label>
            Lowest Pay:
            <input
              type="number"
              name="lowestPay"
              value={filters.lowestPay}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Highest Pay:
            <input
              type="number"
              name="highestPay"
              value={filters.highestPay}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Job Type:
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Select</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="internship">Internship</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Home Office:
            <input
              type="checkbox"
              name="homeOffice"
              checked={filters.homeOffice}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleResetFilters}>Reset Filters</button>
      </form>
    </>
  );
};
export default Filters;
