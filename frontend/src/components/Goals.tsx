import "swiper/swiper-bundle.css"
import { PieChart, Pie, Cell } from "recharts"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from "react-router";
import '../styles/Goals.css'

interface Data {
    "name":string;
    "value": number;
}

const COLORS = ['#dc143c', '#82ca9d']

export default function Goals() {
    // receive goals

    const goals: {
        'goalId': number, 
        'goalTitle': string,
        'currentAmount': number,
        'targetAmount': number, 
    }[] = [
        {'goalId': 1, 'goalTitle': 'Earning a lot of money','currentAmount': 120, 'targetAmount': 250},
        {'goalId': 2,'goalTitle': 'Go to the PH','currentAmount': 300, 'targetAmount': 1200},
        {'goalId': 3,'goalTitle': 'Go again to Japan','currentAmount': 150, 'targetAmount': 1000}
    ]

    return (
        <div className="text-black">
            <div className="flex justify-between items-center mb-4 m-1">
                <h2 className="text-lg font-semibold text-gray-800">Your Goals</h2>
                <Link to="/goals" className="text-blue-600 hover:underline text-sm">View all →</Link>
            </div>
            <Swiper
                className='!min-h-[200px]'
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true}}
            >
                {goals.map((goal) => {

                    const dataFill: Data[] = [
                        {"name": "Goal!","value": goal.targetAmount},
                        {"name": "Current","value": goal.currentAmount}
                    ]

                    return ( 
                    <SwiperSlide key={goal.goalId}>
                        <div className=" bg-white rounded-2xl shadow-md shadow-gray-400 flex flex-col text-center items-center justify-between">
                            <div className="mr-4 mt-6">
                                {/* <p className="text-lg font-semibold mb-1">{goal.goalId}</p> */}
                                <p className="text-gray-800">{goal.goalTitle}</p>
                            </div>
                            <div className="mt-5">
                                <PieChart width={70} height={70}>
                                    <Pie  
                                        data={dataFill} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" cy="50%"
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
                            <p className="text-sm ">{Math.floor((dataFill[1].value / dataFill[0].value) * 100)}% Complete</p>
                        </div>
                        
                    </SwiperSlide>
                )})}
            </Swiper>
            {/* <AddGoalCard /> will be added here */}
        </div>
    )
}