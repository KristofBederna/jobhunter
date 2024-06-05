import React from 'react';

const JobListingModify = ({ jobFormData, handleFormChange, handleFormSubmit }) => (
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
);

export default JobListingModify;
