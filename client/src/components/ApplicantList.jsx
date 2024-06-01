import React from 'react';

const ApplicantList = ({ applicants }) => (
  <ul>
    {applicants.map((applicant) => (
      <li key={applicant.user.id}>
        <p>{applicant.user.email}</p>
        <p>{applicant.user.fullname}</p>
      </li>
    ))}
  </ul>
);

export default ApplicantList;
