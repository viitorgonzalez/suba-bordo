export default function Footer() {
    return (
        <footer className="bg-blue-800 text-blue-200 py-10">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} SubaBordo. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )

}