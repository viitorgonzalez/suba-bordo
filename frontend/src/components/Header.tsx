import { Sailboat } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-700 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200">
                    <Sailboat className="inline-block mr-2 mb-1" size={28} />
                    SubaBordo
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center">
                        <Link href="/login" className="bg-white text-blue-700 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg text-sm transition duration-300  mr-4">
                            Entrar/Cadastrar
                        </Link>
                        <div className="md:hidden ml-4">
                            <button className="text-white focus:outline-none">
                            </button>
                        </div>

                        <div className="md:hidden ml-4">
                            <button className="text-white focus:outline-none">
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}