import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [role, setRole] = useState('employee'); // Toggle between 'employee' and 'employer'
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    workExperience: '',
  });

  const handleToggle = (e) => {
    setRole(e.target.value);
    // Reset work experience when toggling
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Format work experience into an array of experience objects
    let experiences;
    if (formData.workExperience) {
      experiences = formData.workExperience.split('\n').map((line) => {
        const [company, title, interval] = line.split(';');
        return { company: company.trim(), title: title.trim(), interval: interval.trim() };
      });
    }

    const authenticationData = {
      email: formData.email,
      password: formData.password,
      strategy: "local"
    };

    // Register user
    const userData = {
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      role: role === 'employee' ? 'jobseeker' : 'company',
    };

    const userResponse = await fetch("http://localhost:3030/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!userResponse.ok) {
      const errorResponse = await userResponse.json();
      console.error('Error response from server:', errorResponse);
      throw new Error('User registration failed');
    }

    const registeredUser = await userResponse.json();
    console.log('User registered:', registeredUser);

    try {
      // Authenticate user and retrieve JWT token
      const authResponse = await fetch("http://localhost:3030/authentication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticationData),
      });

      if (!authResponse.ok) {
        const errorResponse = await authResponse.json();
        console.error('Error response from server:', errorResponse);
        throw new Error('Authentication failed');
      }

      const authData = await authResponse.json();
      console.log('Authentication successful:', authData);

      // Extract JWT token from the response
      const accessToken = authData.accessToken;

      if (!accessToken) {
        console.error('Access token not found in response');
        throw new Error('Access token not found');
      }

      console.log('Access token:', accessToken);
      // Add experiences if applicable
      if (role === 'employee' && experiences) {
        for (const experience of experiences) {
          const experienceResponse = await fetch("http://localhost:3030/experiences", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(experience),
          });

          if (!experienceResponse.ok) {
            const errorResponse = await experienceResponse.json();
            console.error('Error response from server:', errorResponse);
            throw new Error('Experience addition failed');
          }

          const experienceData = await experienceResponse.json();
          console.log('Experience added:', experienceData);
        }
      }
      navigate('/Login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
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
        <div>
          <label>
            Fullname:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
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

export default RegistrationForm;