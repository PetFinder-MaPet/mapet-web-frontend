import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import VisualReports from './pages/VisualReports';
import MapView from './pages/MapView';
import LostPetReportForm from './components/LostPetReportForm';
import SightedPetReportForm from './components/SeenPetReportform';
import LoginPage from './pages/login';
import RegisterPage from './pages/singUp';
import Navbar from './components/ui/navBar';

function App() {
   return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VisualReports />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reports" element={<VisualReports />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/lost-report" element={<LostPetReportForm />} />
        <Route path="/sighted-report" element={<SightedPetReportForm/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
