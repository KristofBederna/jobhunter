import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserExperiences, modifyUserExperience } from '../actions/userActions';
import { fetchJobsByUserId, deleteJob, modifyJob } from '../actions/jobActions';
import { fetchApplicants } from '../actions/applicantActions';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/Profile/ProfileHeader';
import JobListings from '../components/Profile/Company/JobListings';
import ExperienceListing from '../components/Profile/Jobseeker/ExperienceListings';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { jobs, loading: jobsLoading, error: jobsError } = useSelector((state) => state.jobs);
  const { applicants, loading: applicantsLoading, error: applicantsError } = useSelector((state) => state.applicants);
  const userId = user.id;
  const [currentlyViewingApplicants, setCurrentlyViewingApplicants] = useState(false);
  const [viewedJob, setViewedJob] = useState(null);

  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: '',
    salaryTo: '',
    type: 'full-time',
    city: '',
    homeOffice: false
  });

  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceFormData, setExperienceFormData] = useState({
    company: '',
    title: '',
    interval: ''
  });

  const handleModifyExperience = (experienceId, initialData) => {
    setEditingExperience(experienceId);
    setExperienceFormData(initialData);
  };

  const handleFormChangeExperience = (e) => {
    const { name, value } = e.target;
    setExperienceFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmitExperience = (e) => {
    e.preventDefault();
    dispatch(modifyUserExperience(editingExperience, experienceFormData));
    setEditingExperience(null);
  };

  const handleDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setJobFormData({
      company: job.company,
      position: job.position,
      description: job.description,
      salaryFrom: parseFloat(job.salaryFrom),
      salaryTo: parseFloat(job.salaryTo),
      type: job.type,
      city: job.city,
      homeOffice: job.homeOffice === 1 ? true : false
    });
  };

  const handleView = (jobId) => {
    if (currentlyViewingApplicants) {
      setCurrentlyViewingApplicants(false);
      setViewedJob(null);
      return;
    }
    setCurrentlyViewingApplicants(true);
    setViewedJob(jobId);
    dispatch(fetchApplicants(parseInt(jobId)));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'salaryFrom' || name === 'salaryTo' ? parseFloat(value) : value)
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyJob(editingJob, jobFormData));
    setEditingJob(null);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      if (user.role === 'company') {
        dispatch(fetchJobsByUserId(userId));
      } else {
        dispatch(fetchUserExperiences(userId));
      }
    }
  }, [dispatch, userId, user.role, editingExperience]);

  if (user.loadingProfile) return <p>Loading profile...</p>;
  if (user.errorProfile) return <p>Error: {user.errorProfile}</p>;
  if (jobsLoading) return <p>Loading jobs...</p>;
  if (jobsError) return <p>Error: {jobsError}</p>;

  return (
    <div className='background'>
      <ProfileHeader user={user} />
      {user.role === 'company' ? (
        <JobListings
          jobs={jobs}
          viewedJob={viewedJob}
          currentlyViewingApplicants={currentlyViewingApplicants}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleManageJob={() => navigate('/manageJob')}
          editingJob={editingJob}
          jobFormData={jobFormData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          applicants={applicants}
        />
      ) : (
        <ExperienceListing
          experiences={user.experiences}
          editingExperience={editingExperience}
          handleModifyExperience={handleModifyExperience}
          experienceFormData={experienceFormData}
          handleFormChangeExperience={handleFormChangeExperience}
          handleFormSubmitExperience={handleFormSubmitExperience}
        />
      )}
    </div>
  );
};

export default Profile;
