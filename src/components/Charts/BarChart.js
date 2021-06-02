import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Bar } from 'react-chartjs-2';


const BarChart = () => {

  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])

  useEffect(() => {
    api.get('/transparencia/agendamentos').then((res) => {
      let data = res.data.data.agendamentos
      let myLabels = Object.entries(data).map((item) => item[0]);
      let myValues = Object.entries(data).map((item) => item[1]);
      
      setLabels(myLabels);
      setValues(myValues);
    })
  }, [])


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Agendamentos por dia',
        data: values,
        backgroundColor: ['#00B3F3'],
      },
    ],
  };
  
  const options={
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      }
    },
  
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  }

  return (
    <div className="bar-chart my-chart">
      <Bar data={data} options={options} height={70} width={100}/>
    </div>
  )
  
}

export default BarChart;