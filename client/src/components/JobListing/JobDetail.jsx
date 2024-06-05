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
    <div>
      {user.id ? <button onClick={handleApply}>Apply</button> : <></>}
      <h2>{job.company}</h2>
      <p>{job.position}</p>
      <p>{job.description}</p>
      <p>{job.salaryFrom} - {job.salaryTo}</p>
      <p>{job.type}</p>
      <p>{job.city}</p>
      <p>{job.homeOffice % 2 === 0 ? 'No' : 'Yes'}</p>
      <p id='success'></p>
    </div>
  );
};

export default JobDetail;
