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
    <style>
      {`
          .container {
            margin: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            grid-auto-columns: 1fr;
            gap: 0% 0%;
            grid-auto-flow: row;
            justify-content: center;
            align-content: center;
            justify-items: stretch;
            row-gap: 5px;
            grid-template-areas:
              "company-name company-name"
              "city salary"
              "type home-office";
          }
          
          .company-name { 
            grid-area: company-name;
            color: #213547;
            font-size: 20px;
           }
          
          .city { 
            grid-area: city; 
            font-size: 15px;
          }
          
          .salary { grid-area: salary; font-size: 20px; }
          
          .home-office { grid-area: home-office; font-size: 15px; }
          
          .type { grid-area: type; font-size: 15px; }
           form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
    div {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="number"],
  input[type="text"],
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  input[type="checkbox"] {
    margin-left: 10px;
  }
  button {
    padding: 10px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  .add-new-listing {
    background-color: #28a745;
    color: white;
  }
  .delete {
    background-color: #dc3545;
    color: white;
  }
        `}
    </style>
    <h3>Job Postings</h3>
    <ul>
      {jobs.map((job) => (
        <div key={job.id}>
          <div class="container">
            <div class="company-name">{job.company}</div>
            <div class="city">{job.city}</div>
            <div class="salary">{job.salaryFrom} - {job.salaryTo}</div>
            <div class="home-office">HO: {job.homeOffice % 2 == 1 ? "Yes" : "No"}</div>
            <div class="type">{job.type}</div>
          </div>
          <button disabled={job.id == viewedJob ? false : currentlyViewingApplicants} onClick={() => handleView(job.id)}>View</button>
          <button className='add-new-listing' onClick={() => handleEdit(job)}>Modify</button>
          <button className='delete' onClick={() => handleDelete(job.id)}>Delete</button>
          {applicants.length > 0 && job.id === viewedJob ? <ApplicantList applicants={applicants} /> : null}
          {applicants.length == 0 && job.id === viewedJob &&
            <>
              <p>No applicants</p>
            </>}
          {editingJob === job.id && (
            <JobListingModify
              jobFormData={jobFormData}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
            />
          )}
          <hr></hr>
        </div>
      ))}
    </ul>
    <button className='add-new-listing' onClick={handleManageJob}>Add new job listing</button>
  </div>
);

export default JobListings;