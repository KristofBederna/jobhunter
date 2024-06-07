import React from 'react';
import ExperienceModify from './ExperienceModify';

const ExperienceListing = ({
  experiences,
  editingExperience,
  handleModifyExperience,
  experienceFormData,
  handleFormChangeExperience,
  handleFormSubmitExperience
}) => (
  <div>
    <style>
      {`
      h3 {
        color: #213547;
        font-size: 20px;
        margin-bottom: 10px;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      h4 {
        font-size: 18px;
        margin-bottom: 5px;
      }
      p {
        margin-bottom: 5px;
      }
      button {
        background-color: #213547;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `}
    </style>
    <h3>Experiences</h3>
    <ul>
      {experiences.map((exp) => (
        <>
          <li key={exp.id}>
            <h4>{exp.title} at {exp.company}</h4>
            <p>{exp.interval}</p>
            {editingExperience === exp.id ? (
              <ExperienceModify
                experienceFormData={experienceFormData}
                handleFormChangeExperience={handleFormChangeExperience}
                handleFormSubmitExperience={handleFormSubmitExperience}
              />
            ) : (
              <button onClick={() => handleModifyExperience(exp.id, { company: exp.company, title: exp.title, interval: exp.interval })}>
                Modify
              </button>
            )}
          </li>
          <hr></hr>
        </>
      ))}
    </ul>
  </div>
);

export default ExperienceListing;
