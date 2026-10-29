
import { Route , Routes } from 'react-router';

import HomePage from './HomePage';
import JobSeekersSection from './Job Seekers';
import EmployersSection from './EmployersSection';
import CompaniesSection from './CompaniesSection';
import MyProfile from './MyProfile';
import About from './About';
import Notes from './Notes';
import ResumeBuilder from './ResumeBuilder';
import Guidence from './Guidence';
import InterviewPage from './Interview/Pages/InterviewPage';
import ResultPage from './Interview/Pages/ResultPage';
import StrategyCareer from './Strategy/StrategyCareer';
import { SalaryEstimator } from './Salary';
import { ResumeAnalyzerPage } from './ResumeOptimization/Index';
import SkillsPage from './Skills/Pages/SkillsPage';
import SkillsResultPage from './Skills/Pages/SkillsResultPage';
import JobDescription from './JobDescription';
import Companies from './Admin/Companies';
import CompanyName from './Admin/CompanyName';
import RegisteredCompanies from './Admin/RegisteredCompanies';
import AccountDetails from './AccountDetails';
import AdminJobs from './Admin/AdminJobs';
import PostJobs from './Admin/PostJobs';
import Applicants from './Admin/Applicants';
import HelpCenter from './HelpCenter';
import Faqs from "./Faqs";
import SafetyCenter from './SafetyCenter';
import FilterJobs from './FilterJobs';
import ProtectedRoute from './Admin/ProtectedRoutes';
import RegisteredUsers from './Admin/RegisteredUsers';
import PrivacyPolicy from './PrivacyPolicy';
import Journey from "./Journey";
import HRresources from "./HRresources";
import RecruiterDemo from "./RecruiterDemo";

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element = {<HomePage />}  />
        <Route path='/job-seekers' element = {<JobSeekersSection />} />
        <Route path='/employers' element = {<EmployersSection />} />
        <Route path='/companies' element = {<CompaniesSection />} />
        <Route path='/my-profile' element = {<MyProfile />} />
        <Route path='/about-us'   element = {<About />} />
        <Route path='/register' element = {<HomePage /> } />
        <Route path='/login'  element = {<HomePage />}  />
        <Route path='/recruiter-dashboard' element={<ProtectedRoute><RecruiterDemo /></ProtectedRoute>} />
        <Route path='/services/resume-builder' element = {<ResumeBuilder />} />
        <Route path='/services/guidence' element = {<Guidence /> }  />
        <Route path='/services/guidence/interview' element = {<InterviewPage />} />
        <Route path='/services/guidence/result' element = {<ResultPage />} />
        <Route path='/services/guidence/career' element = {<StrategyCareer />}  />
        <Route path='/services/guidence/salary' element = {<SalaryEstimator />} /> 
        <Route path='/services/guidence/resumeoptimization' element = {<ResumeAnalyzerPage />} />
        <Route path="/services/skills" element={<SkillsPage />} />
        <Route path="/services/skills/:subject" element={<SkillsPage />} />
        <Route path='/services/skills/result' element = {<SkillsResultPage />} />
        <Route path='/job-seekers/description/:id' element = {<JobDescription /> } />
        <Route path='/employers/job-post/:id' element = {<Companies />} />
        <Route path='employers/company-name' element = {<CompanyName />} />
        <Route path='/admin/registered-companies' element = {<ProtectedRoute><RegisteredCompanies /></ProtectedRoute>} />
        <Route path='/profile/settings' element = {<AccountDetails />} />
        <Route path='/admin/jobs' element = {<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path='/admin-jobs/post-jobs' element = {<ProtectedRoute><PostJobs /></ProtectedRoute>} />
        <Route path='/admin/jobs/:id/applicants' element = {<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path='/help-center' element = {<HelpCenter />} />
        <Route path='/faqs' element = {<Faqs />} />
        <Route path='/safety-center' element = {<SafetyCenter />} />
        <Route path='/filter-jobs' element = {<FilterJobs />} />
        <Route path='/registered-users' element = {<RegisteredUsers />} />
        <Route path='/privacy-policy' element = {<PrivacyPolicy />} />
        <Route path='/part-of-journey' element = {<Journey />} />
        <Route path='/admin/hr-resources' element = {<HRresources /> } />
      </Routes>
    </div>
  )
}

export default App
