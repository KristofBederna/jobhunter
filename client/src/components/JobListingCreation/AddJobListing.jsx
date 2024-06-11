import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../../actions/jobActions';
import { Range, getTrackBackground } from 'react-range';

const AddJobListing = () => {
  const dispatch = useDispatch();
  const { loading, error, createJobSuccess } = useSelector((state) => state.jobs);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: 0,
    salaryTo: 0,
    type: 'full-time',
    city: '',
    homeOffice: false
  });
  const [salaryRange, setSalaryRange] = useState([0, 0]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRangeChange = (values) => {
    setSalaryRange(values);
    setFormData({
      ...formData,
      salaryFrom: values[0],
      salaryTo: values[1]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      salaryFrom: Number(formData.salaryFrom),
      salaryTo: Number(formData.salaryTo),
      homeOffice: formData.homeOffice
    };
    dispatch(createJob(jobData));
  };

  return (
    <div className='form-container'>
      <style>{`
        .form-container {
          max - width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
  }
        h1 {
          text - align: center;
        margin-bottom: 20px;
  }
        form div {
          margin - bottom: 15px;
  }
        form label {
          display: block;
        margin-bottom: 5px;
        font-weight: bold;
  }
        form input[type="text"],
        form input[type="number"],
        form textarea,
        form select {
          width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
  }
        form textarea {
          height: 100px;
  }
        button {
          width: 100%;
        padding: 10px;
        margin-top: 20px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        background-color: #213547;
        color: white;
        font-size: 16px;
  }
        button:hover {
        background-color: #0056b3;
        }
`}
      </style>

      <h1>New listing</h1>
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
            />
          </label>
        </div>
        <div>
          <label>
            Salary Range:
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
              <Range
                values={salaryRange}
                step={1000}
                min={0}
                max={10000000}
                onChange={handleRangeChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      background: getTrackBackground({
                        values: salaryRange,
                        colors: ['#ccc', '#213547', '#ccc'],
                        min: 0,
                        max: 10000000
                      }),
                      alignSelf: 'center'
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '24px',
                      width: '24px',
                      borderRadius: '12px',
                      backgroundColor: '#213547',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-28px',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                        padding: '4px',
                        borderRadius: '4px',
                        backgroundColor: '#213547'
                      }}
                    >
                      {salaryRange[index]}
                    </div>
                  </div>
                )}
              />
            </div>
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

export default AddJobListing;
