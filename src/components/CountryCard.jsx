import { ExternalLink } from "lucide-react";

export default function CountryCard({ country }) {
    return (
        <div className="bg-white border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img
                src={country.flags.svg}
                alt={country.flags.alt}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="p-4">
                <h3 className="text-xl text-gray-800 mb-2 truncate">
                    {country.name.common}
                </h3>
                <p className="text-gray-600 text-sm">{country.region}</p>
                <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold">
                        Código: {country.cca3}
                    </span>
                </p>
                <button
                    to={`/country/${country.cca3}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Ver detalles
                    <ExternalLink
                        size={16}
                        className="inline-block ml-2 w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
}
