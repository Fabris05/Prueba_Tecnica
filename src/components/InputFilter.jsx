import { Search } from "lucide-react";

export default function InputFilter({
    value,
    onChange,
    placeholder = "Buscar...",
}) {
    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
        </div>
    );
}
