import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import VisualReports from './pages/VisualReports';
import LostPetReportForm from './components/LostPetReportForm';
import SightedPetReportForm from './components/SeenPetReportform';

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost-report" element={<LostPetReportForm />} />
        <Route path="/sighted-report" element={<SightedPetReportForm/>} />
        <Route path="/reports" element={<VisualReports />} />
      </Routes>
    </Router>
    
  );
}

export default App;
