
interface Goal {
    goalId: number;
    goalTitle: string;
}

export default function GoalsCard({goalContent}:{goalContent: Goal}) {

    // Receving props

    return (
        <div>
            <p>{goalContent.goalId}</p>
            <p>{goalContent.goalTitle}</p>
        </div>
    )
}