import { Bell, BookOpen } from "lucide-react";

export default function Navbar() {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <BookOpen
                        size={30}
                        className="text-blue-600"
                    />

                    <div>
                        <h1 className="text-2xl font-bold">
                            DeadlineHub AI
                        </h1>

                        <p className="text-gray-500 text-sm">
                            Smart Assignment Manager
                        </p>
                    </div>

                </div>

                <Bell
                    className="text-gray-500 cursor-pointer"
                    size={22}
                />

            </div>
        </header>
    );
}