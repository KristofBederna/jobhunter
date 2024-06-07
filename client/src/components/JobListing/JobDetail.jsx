import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../../actions/jobActions';
import { applyToJob } from '../../actions/userActions';

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading, error } = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  const handleApply = () => {
    dispatch(applyToJob(parseInt(id), document.getElementById('success')));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!job) return <p>No job found</p>;

  return (
    <>
      <style>
        {`
        .container {
        padding: 20px;
        }
      h2 {
        color: #213547;
        font-size: 25px;
      }
      button {
        background-color: #213547;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      p {
        margin-bottom: 10px;
      }
    `}
      </style>
      <div className='container'>
        {user.id ? <button onClick={handleApply}>Apply</button> : null}
        <h2>{job.company}</h2>
        <p>{job.position}</p>
        <p>{job.description}</p>
        <p>Salary Range: {job.salaryFrom} - {job.salaryTo}</p>
        <p>Type: {job.type}</p>
        <p>City: {job.city}</p>
        <p>Home Office: {job.homeOffice % 2 === 0 ? 'No' : 'Yes'}</p>
      </div>
    </>
  );
};

export default JobDetail;
