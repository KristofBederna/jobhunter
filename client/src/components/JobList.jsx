import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../actions/jobActions';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}> {/* Fixed navigate call */}
            <li>
              <h3>{job.company}</h3>
              <p>{job.position}</p>
              <p>{job.city}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
