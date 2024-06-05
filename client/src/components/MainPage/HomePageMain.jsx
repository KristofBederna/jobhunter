import SearchBar from './SearchBar';
import JobList from './JobList';

const HomePageMain = () => {
  return (
    <>
      <h2>Available Jobs</h2>
      <SearchBar />
      <JobList />
    </>
  );
};
export default HomePageMain;
