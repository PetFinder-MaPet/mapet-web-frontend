import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-transparent px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold text-purple-700">🐾 MaPet</h1>
      <div className="space-x-4">
        <Link to="/reports" className="text-gray-700 hover:text-login -600 font-medium">
          Ver reportes
        </Link>
        <Link to="/lost-report" className="text-gray-700 hover:text-login -600 font-medium">
          Reportar pérdida
        </Link>
        <Link to="/sighted-report" className="text-gray-700 hover:text-login -600 font-medium">
          Reportar avistamiento
        </Link>
        <Link to="/login" className="bg-login -500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
