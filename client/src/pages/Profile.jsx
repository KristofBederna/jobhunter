import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserExperiences, modifyUserExperience } from '../actions/userActions';
import { fetchJobsByUserId, deleteJob, modifyJob } from '../actions/jobActions';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { jobs, loading: jobsLoading, error: jobsError } = useSelector((state) => state.jobs);
  const userId = user.id; // Assuming user ID is stored in state.user.id

  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: '',
    salaryTo: '',
    type: 'full-time',
    city: '',
    homeOffice: false
  });

  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceFormData, setExperienceFormData] = useState({
    company: '',
    title: '',
    interval: ''
  });

  const handleModifyExperience = (experienceId, initialData) => {
    setEditingExperience(experienceId);
    setExperienceFormData(initialData);
  };

  const handleFormChangeExperience = (e) => {
    const { name, value } = e.target;
    setExperienceFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmitExperience = (e) => {
    e.preventDefault();
    dispatch(modifyUserExperience(editingExperience, experienceFormData));
    console.log(experienceFormData);
    setEditingExperience(null);
  };

  const handleDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setJobFormData({
      company: job.company,
      position: job.position,
      description: job.description,
      salaryFrom: parseFloat(job.salaryFrom),
      salaryTo: parseFloat(job.salaryTo),
      type: job.type,
      city: job.city,
      homeOffice: job.homeOffice === 1 ? true : false
    });
  };

  const handleView = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobFormData((prev) => ({
      ...prev,
      [name]: (name === 'salaryTo' ? parseFloat(value) : value),
      [name]: type === 'checkbox' ? checked : (name === 'salaryFrom' ? parseFloat(value) : value)

    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyJob(editingJob, jobFormData));
    setEditingJob(null);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      if (user.role === 'company') {
        dispatch(fetchJobsByUserId(userId));
      } else {
        dispatch(fetchUserExperiences(userId));
      }
    }
  }, [dispatch, userId, user.role, editingExperience]);

  if (user.loadingProfile) return <p>Loading profile...</p>;
  if (user.errorProfile) return <p>Error: {user.errorProfile}</p>;
  if (jobsLoading) return <p>Loading jobs...</p>;
  if (jobsError) return <p>Error: {jobsError}</p>;
  const handleManageJob = () => {
    navigate('/manageJob');
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Name: {user.fullname}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.role === 'company' ? (
        <>
          <h3>Job Postings</h3>
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <h4>{job.position} at {job.company}</h4>
                <p>{job.description}</p>
                <p>Location: {job.city}</p>
                <p>Salary: {job.salaryFrom} - {job.salaryTo}</p>
                <p>{job.type}</p>
                <p>Home office: {job.homeOffice % 2 == 1 ? "Yes" : "No"}</p>
                <button onClick={() => handleView(job.id)}>View</button>
                <button onClick={() => handleEdit(job)}>Modify</button>
                <button onClick={() => handleDelete(job.id)}>Delete</button>
                {editingJob === job.id && (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="company"
                      value={jobFormData.company}
                      onChange={handleFormChange}
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      name="position"
                      value={jobFormData.position}
                      onChange={handleFormChange}
                      placeholder="Position"
                    />
                    <textarea
                      name="description"
                      value={jobFormData.description}
                      onChange={handleFormChange}
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      name="salaryFrom"
                      value={jobFormData.salaryFrom}
                      onChange={handleFormChange}
                      placeholder="Salary From"
                    />
                    <input
                      type="number"
                      name="salaryTo"
                      value={jobFormData.salaryTo}
                      onChange={handleFormChange}
                      placeholder="Salary To"
                    />
                    <select
                      name="type"
                      value={jobFormData.type}
                      onChange={handleFormChange}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="internship">Internship</option>
                    </select>
                    <input
                      type="text"
                      name="city"
                      value={jobFormData.city}
                      onChange={handleFormChange}
                      placeholder="City"
                    />
                    <label>
                      Home Office
                      <input
                        type="checkbox"
                        name="homeOffice"
                        checked={jobFormData.homeOffice}
                        onChange={handleFormChange}
                      />
                    </label>
                    <button type="submit">Save</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
          <button onClick={handleManageJob}>Add new job listing</button>
        </>
      ) : (
        <>
          <h3>Experiences</h3>
          <ul>
            {user.experiences.map((exp) => (
              <li key={exp.id}>
                <h4>{exp.title} at {exp.company}</h4>
                <p>{exp.interval}</p>
                {editingExperience === exp.id ? (
                  <form onSubmit={handleFormSubmitExperience}>
                    <input
                      type="text"
                      name="company"
                      value={experienceFormData.company}
                      onChange={handleFormChangeExperience}
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      name="title"
                      value={experienceFormData.title}
                      onChange={handleFormChangeExperience}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      name="interval"
                      value={experienceFormData.interval}
                      onChange={handleFormChangeExperience}
                      placeholder="Interval"
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <button onClick={() => handleModifyExperience(exp.id, { company: exp.company, title: exp.title, interval: exp.interval })}>
                    Modify
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
