import React, { useState } from 'react';

const Register = () => {
  const [role, setRole] = useState('employee'); // Toggle between 'employee' and 'employer'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    workExperience: '',
  });

  const handleToggle = (e) => {
    setRole(e.target.value);
    // Reset work experience when toggling
    setFormData({
      email: formData.email,
      password: formData.password,
      workExperience: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div>
      <h2>Registration</h2>
      <div>
        <label>
          <input
            type="radio"
            value="employee"
            checked={role === 'employee'}
            onChange={handleToggle}
          />
          Employee
        </label>
        <label>
          <input
            type="radio"
            value="employer"
            checked={role === 'employer'}
            onChange={handleToggle}
          />
          Employer
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {role === 'employee' && (
          <div>
            <label>
              Work Experience:
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                placeholder="Halo Haven;Front-end Developer;2021-2022\nDunder Mifflin;Full-stack Developer;2022-"
              />
            </label>
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
