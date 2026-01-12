import { NavLink, useParams } from "react-router-dom";

export default function Navbar() {

  return (
    <header className="w-full bg-white border border-gray-200 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="font-sans text-3xl font-bold text-blue-800">App 
          <span className="font-sans ml-1 text-orange-600">Viajes</span>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><NavLink to="/" className="text-gray-700 text-xl hover:text-blue-900">Inicio</NavLink></li>
            <li><NavLink to="/mytrips" className="text-gray-700 text-xl hover:text-blue-900">Mis viajes</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
