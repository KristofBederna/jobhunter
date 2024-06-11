import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    workExperience: '',
  });
  const [errors, setErrors] = useState([]);

  const handleToggle = (e) => {
    setRole(e.target.value);
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
    setErrors([]);
    if (formData.fullname.split(" ").length < 2) {
      setErrors(prevErrors => [...prevErrors, "Full name must be at least 2 words long"]);
    }
    let experiences;
    if (formData.workExperience) {
      try {
        experiences = formData.workExperience.split('\n').map((line) => {
          const [company, title, interval] = line.split(';');
          if (!company || !title || !interval) {
            throw new Error('Invalid format');
          }

          if (!interval.includes("-")) {
            setErrors(prevErrors => [...prevErrors, "Interval must be an interval"]);
            throw new Error('Invalid format');
          }

          const [start, end] = interval.split("-").map(part => part.trim());
          if (isNaN(Number(start)) || isNaN(Number(end))) {
            setErrors(prevErrors => [...prevErrors, "Interval must contain numeric values"]);
            throw new Error('Invalid format');
          }

          return { company: company.trim(), title: title.trim(), interval: interval.trim() };
        });
      } catch (error) {
        setErrors(prevErrors => [...prevErrors, "Work experience must be in the format company;position;from-to"]);
        return;
      }
    }

    if (errors.length > 0) {
      return;
    }
    const authenticationData = {
      email: formData.email,
      password: formData.password,
      strategy: "local"
    };
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
      const accessToken = authData.accessToken;

      if (!accessToken) {
        console.error('Access token not found in response');
        throw new Error('Access token not found');
      }

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
      <style>
        {`
  .registration-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
    .selectionButtons {
    margin-left: 5rem;
    }
    form {
    padding: 5rem;
    }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .radio-group {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .radio-group label {
    margin: 0 10px;
  }
  form div {
    margin-bottom: 15px;
  }
  form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="email"],
  input[type="password"],
  input[type="text"],
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  textarea {
    height: 100px;
  }
  button {
    display: block;
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
      <h2>Registration</h2>
      <div className='selectionButtons'>
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

        {errors && errors.length > 0 && errors.map((error, index) => <p key={index}>{error}</p>)}
      </form>
    </div>
  );
};

export default RegistrationForm;