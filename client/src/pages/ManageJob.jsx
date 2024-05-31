import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../actions/jobActions';

const ManageJob = () => {
  const dispatch = useDispatch();
  const { loading, error, createJobSuccess } = useSelector((state) => state.jobs);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: '',
    salaryTo: '',
    type: 'full-time',
    city: '',
    homeOffice: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      salaryFrom: Number(formData.salaryFrom),
      salaryTo: Number(formData.salaryTo),
      homeOffice: formData.homeOffice // Ensure homeOffice is boolean
    };
    console.log('Submitting job data:', jobData); // Log jobData before dispatching
    dispatch(createJob(jobData));
  };

  return (
    <div>
      <h1>Manage Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Salary From:
            <input
              type="number"
              name="salaryFrom"
              value={formData.salaryFrom}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Salary To:
            <input
              type="number"
              name="salaryTo"
              value={formData.salaryTo}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
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
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Home Office:
            <input
              type="checkbox"
              name="homeOffice"
              checked={formData.homeOffice}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {createJobSuccess && <p style={{ color: 'green' }}>Job created successfully!</p>}
      </form>
    </div>
  );
};

export default ManageJob;
