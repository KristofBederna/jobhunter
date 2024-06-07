import React from 'react';

const ExperienceModify = ({ experienceFormData, handleFormChangeExperience, handleFormSubmitExperience }) => (
  <form onSubmit={handleFormSubmitExperience}>
    <style>
      {`
      form {
        margin-bottom: 20px;
      }
      input[type="text"] {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
      }
    `}
    </style>
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
