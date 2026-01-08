import { Loader } from "lucide-react";

export default function LoaderSpin() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin mx-auto text-blue-600" size={68} />
        </div>
    );
}
