import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import VisualReports from './pages/VisualReports';
import MapView from './pages/MapView';
import LostPetReportForm from './components/LostPetReportForm';
import SightedPetReportForm from './components/SeenPetReportform';
import LoginPage from './pages/login';

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<VisualReports />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/lost-report" element={<LostPetReportForm />} />
        <Route path="/sighted-report" element={<SightedPetReportForm/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
