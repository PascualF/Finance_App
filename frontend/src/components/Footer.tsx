export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} FinanceApp. All rights reserved.
            </p>
            <p className="text-xs mt-2">
                Made with ❤️ by Pascual Felicio
            </p>
        </footer>
    )

}