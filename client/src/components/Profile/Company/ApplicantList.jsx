import React from 'react';

const ApplicantList = ({ applicants }) => (
  <>
    <style>
      {`
      .applicants-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 18px;
        text-align: left;
      }

      .applicants-table th,
      .applicants-table td {
        padding: 12px 15px;
        border: 1px solid #ddd;
      }

      .applicants-table th {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      .applicants-table tbody tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    `}
    </style>

    <table class="applicants-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email Address</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant) => (
          <tr key={applicant.user.email}>
            <td>{applicant.user.fullname}</td>
            <td>{applicant.user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>

);

export default ApplicantList;
