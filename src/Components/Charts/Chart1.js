import React, { useEffect } from 'react';
import moment from 'moment/moment';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line,Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function Chart1() {

    const chartData = useSelector(state=>state.chartData);
    console.log(chartData)

    const chartData2 = useSelector(state=>state.chartData2)
    console.log(chartData2)

    const selectedChart = useSelector(state =>state.chartSelect);
   
            const options = {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                  },
                },
              };
              
              const labels = chartData.map(time=>moment(time[0]).format('MM/YY HH:MM'))
              
              const data = {
                labels,
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: chartData.map(price=>price[1]),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Dataset 2',
                    data: labels.map(() => chartData2.map(price=>price[1])),
                    borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              };
    
// selecting the chart name


// Conditional Rendering for chart types

let PlotChart;

if(selectedChart==='Line Chart'){
             PlotChart =  <Line options={options} data={data} />
}else if(selectedChart==='Bar Chart'){
          PlotChart =   <Bar options={options} data={data} />
}else{
        PlotChart = <p>Please Seclect chart</p>
}


  return (
    <div>
        
        {/* <p>slected chart is {selectedChart}</p> */}
        {/* <div>chart for {coin} is here:</div> */}
        <div>
            {PlotChart}
        </div>
    </div>
    
  )
}

export default Chart1