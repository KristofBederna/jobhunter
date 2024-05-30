import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../actions/jobActions';

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!job) return <p>No job found</p>;

  return (
    <div>
      <h2>{job.company}</h2>
      <p>{job.position}</p>
      <p>{job.description}</p>
      <p>{job.salaryFrom} - {job.salaryTo}</p>
      <p>{job.type}</p>
      <p>{job.city}</p>
    </div>
  );
};

export default JobDetail;
