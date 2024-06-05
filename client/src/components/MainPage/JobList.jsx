import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../../actions/jobActions';
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
    <>
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
