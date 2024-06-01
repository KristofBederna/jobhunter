import React from 'react';
import JobListingModify from './JobListingModify';
import ApplicantList from './ApplicantList';

const JobListings = ({
  jobs,
  viewedJob,
  currentlyViewingApplicants,
  handleView,
  handleEdit,
  handleDelete,
  handleManageJob,
  editingJob,
  jobFormData,
  handleFormChange,
  handleFormSubmit,
  applicants
}) => (
  <div>
    <h3>Job Postings</h3>
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>
          <h4>{job.position} at {job.company}</h4>
          <p>{job.description}</p>
          <p>Location: {job.city}</p>
          <p>Salary: {job.salaryFrom} - {job.salaryTo}</p>
          <p>{job.type}</p>
          <p>Home office: {job.homeOffice % 2 === 1 ? "Yes" : "No"}</p>
          <button disabled={job.id == viewedJob ? false : currentlyViewingApplicants} onClick={() => handleView(job.id)}>View</button>
          <button onClick={() => handleEdit(job)}>Modify</button>
          <button onClick={() => handleDelete(job.id)}>Delete</button>
          {applicants.length > 0 && job.id === viewedJob ? <ApplicantList applicants={applicants} /> : null}
          {editingJob === job.id && (
            <JobListingModify
              jobFormData={jobFormData}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
            />
          )}
        </li>
      ))}
    </ul>
    <button onClick={handleManageJob}>Add new job listing</button>
  </div>
);

export default JobListings;