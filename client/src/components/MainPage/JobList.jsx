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
      <style>
        {`
          .container {
            margin: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-auto-columns: 1fr;
            gap: 0% 0%;
            grid-auto-flow: row;
            justify-content: center;
            align-content: center;
            justify-items: stretch;
            row-gap: 5px;
            grid-template-areas:
              "company-name company-name"
              "city salary"
              "type home-office";
          }
          
          .company-name { 
            grid-area: company-name;
            color: #213547;
            font-size: 20px;
           }
          
          .city { 
            grid-area: city; 
            font-size: 15px;
          }
          
          .salary { grid-area: salary; font-size: 20px; }
          
          .home-office { grid-area: home-office; font-size: 15px; }
          
          .type { grid-area: type; font-size: 15px; }
          
        `}
      </style>
      <ul>
        {jobs.map((job) => (
          <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
            <div className="container">
              <div className="company-name">{job.company}</div>
              <div className="city">{job.city}</div>
              <div className="salary">{job.salaryFrom} - {job.salaryTo}</div>
              <div className="home-office">HO: {job.homeOffice % 2 == 1 ? "Yes" : "No"}</div>
              <div className="type">{job.type}</div>
            </div>
            <hr></hr>
          </div>
        ))}
      </ul>
    </>
  );
};
export default JobList;
