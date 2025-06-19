import "swiper/swiper-bundle.css"
import { PieChart, Pie, Cell } from "recharts"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';


interface Data {
    "name":string;
    "value": number;
}

const dataFill: Data[] = [
    {"name": "Goal!","value": 250},
    {"name": "Current","value": 120}
]

const COLORS = ['#dc143c', '#82ca9d']

export default function Goals() {
    // receive goals

    const goals: {'goalId': number, 'goalTitle': string }[] = [
        {'goalId': 1, 'goalTitle': 'Earning a lot of money'},
        {'goalId': 2,'goalTitle': 'Go to the PH'},
        {'goalId': 3,'goalTitle': 'Go again to Japan'}
    ]

    return (
        <div className="border-black border text-black h-full">
            <div className="flex space-around">
                <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
                <p>{'Link to Goals >>'}</p>
            </div>
            <Swiper
                className='!min-h-[200px]'
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true}}
            >
                {goals.map((goal) => (
                    <SwiperSlide key={goal.goalId}>
                        <div className="p-4 bg-white rounded-2xl shadow-md h-full flex justify-around h-full">
                            <div className="mb-4">
                                <p className="text-lg font-semibold mb-1">{goal.goalId}</p>
                                <p className="text-gray-800">{goal.goalTitle}</p>
                            </div>
                            <div className="">
                                <PieChart width={70} height={70}>
                                    <Pie  
                                        data={dataFill} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" 
                                        cy="50%" 
                                        outerRadius={30} 
                                        fill="#82ca9d" 
                                        endAngle={180} 
                                    >
                                        {dataFill.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                </PieChart>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <AddGoalCard /> will be added here */}
        </div>
    )
}