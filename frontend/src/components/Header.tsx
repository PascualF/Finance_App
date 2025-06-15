export default function Header() {
    return (
        <header className="flex justify-between items-center bg-blue-600 text-white py-4 px-6">
            <div>
                <h1 className="inline-block text-3xl font-bold">FinanceApp</h1>
                <p className="mt-1 text-sm text-width/80">Your personal finance tracker</p>
            </div>
            <div>
                <p>This will be for eveything connected to the user</p>
            </div>
        </header>
    );
}