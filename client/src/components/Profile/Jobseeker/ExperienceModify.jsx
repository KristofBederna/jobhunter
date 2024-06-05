import React from 'react';

const ExperienceModify = ({ experienceFormData, handleFormChangeExperience, handleFormSubmitExperience }) => (
  <form onSubmit={handleFormSubmitExperience}>
    <input
      type="text"
      name="company"
      value={experienceFormData.company}
      onChange={handleFormChangeExperience}
      placeholder="Company"
    />
    <input
      type="text"
      name="title"
      value={experienceFormData.title}
      onChange={handleFormChangeExperience}
      placeholder="Title"
    />
    <input
      type="text"
      name="interval"
      value={experienceFormData.interval}
      onChange={handleFormChangeExperience}
      placeholder="Interval"
    />
    <button type="submit">Save</button>
  </form>
);

export default ExperienceModify;
