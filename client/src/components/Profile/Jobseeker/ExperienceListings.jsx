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
    <h3>Experiences</h3>
    <ul>
      {experiences.map((exp) => (
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
      ))}
    </ul>
  </div>
);

export default ExperienceListing;
