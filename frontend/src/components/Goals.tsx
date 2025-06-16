import GoalsCard from "./GoalsCard"

export default function Goals() {
    // receive goals

    const goals: {'goalId': number, 'goalTitle': string }[] = [
        {
            'goalId': 1,
            'goalTitle': 'Earning a lot of money',
        },
        {
            'goalId': 2,
            'goalTitle': 'Go to the PH',
        },
        {
            'goalId': 3,
            'goalTitle': 'Go again to Japan',
        }
        
    ]

    return (
        <div className="border-black border">
            <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
            <div>
                {goals.map((goal) => (
                    <GoalsCard key={goal.goalId} goalContent={goal}/>
                ))}
                <p>Adding Goal</p>
                {/* <AddGoalCard /> will be added here */}
            </div>
        </div>
    )
}