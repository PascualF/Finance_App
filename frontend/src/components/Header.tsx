
interface HeaderProps {
    currentRoute: string;
}

export default function Header({ currentRoute }: HeaderProps) {

    let headerTitle = '';
    let rightContent = null



    switch(currentRoute) {
        case '/':
            headerTitle = 'Dahsboard'
            rightContent = 'Welcome back!'
            break
        case '/transactions':
            headerTitle = 'Transactions'
            rightContent = 'Manage your transactions here'
            break
        case '/investments':
            headerTitle = 'Investments'
            rightContent = 'Track your investments'
            break
        case '/bills':
            headerTitle = 'Bills'
            rightContent = 'Manage your bills'
            break
        case '/expenses':
            headerTitle = 'Expenses'
            rightContent = 'Track your expenses'
            break
        case '/goals':
            headerTitle = 'Goals'
            rightContent = 'Set and track your financial goals'
            break
        case '/splitwise':
            headerTitle = 'Splitwise'
            rightContent = 'Manage your shared expenses'
            break
        case '/profile':
            headerTitle = 'Profile'
            rightContent = 'View and edit your profile'
            break
        case '/settings':
            headerTitle = 'Settings'
            rightContent = 'Adjust your app settings'
            break
    }


    return (
        <header className="flex justify-between items-center bg-gradient-to-r from-slate-800 to-gray-700 text-white py-4 px-6 shadow-md">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{headerTitle}</h1>
                <p className="mt-1 text-sm text-width/80">{rightContent}</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                    PF
                </div>
                <span className="text-white font-medium">Pascual Felicio (username)</span>
            </div>
        </header>
    );
}