
export default function Navbar() {
  return (
    <header className="w-full bg-white border border-gray-200 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold text-blue-800">App 
          <span className="font-sans ml-1 text-orange-600">Viajes</span>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-700 hover:text-gray-900">Inicio</a></li>
            <li><a href="/about" className="text-gray-700 hover:text-gray-900">Mis viajes</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
