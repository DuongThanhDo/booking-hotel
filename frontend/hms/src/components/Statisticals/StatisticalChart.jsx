import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

function StatisticalChart() {
    const data = {
        labels: ['Phong 1', 'phong 2', 'phong 3', 'phong 2', 'phong 3', 'phong 2', 'phong 3', 'phong 2'],
        datasets: [
            {
                label: 'Biểu đồ doanh thu',
                data: [1, 2, 3, 2, 3, 2, 3, 2, 3],
            },
        ],
    };
    return (
        <div className="h-[70vh] flex gap-4">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-xl relative">
                <Doughnut data={data} />
            </div>
            <div className="w-full h-full bg-white p-6 rounded-xl shadow-xl">
                <Bar data={data} />
            </div>
        </div>
    );
}

export default StatisticalChart;
