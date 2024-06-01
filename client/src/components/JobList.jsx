import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../actions/jobActions';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    lowestPay: '',
    highestPay: '',
    type: '',
    city: '',
    homeOffice: false,
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Available Jobs</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for jobs..."
        />
        <button onClick={handleSearchSubmit}>Search</button>
        <button onClick={toggleFilters}>Filters</button>
        {showFilters && (
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
        )}
      </div>
      <ul>
        {jobs.map((job) => (
          <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
            <li>
              <h3>{job.company}</h3>
              <p>Position: {job.position}</p>
              <p>City: {job.city}</p>
              <p>Type: {job.type}</p>
              <p>Pay: {job.salaryFrom}-{job.salaryTo}</p>
              <p>Home office: {job.homeOffice % 2 == 1 ? "Yes" : "No"}</p>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
export default JobList;
