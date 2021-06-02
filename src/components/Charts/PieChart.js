import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Pie } from 'react-chartjs-2';


const PieChart = () => {

  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])

  useEffect(() => {
    api.get('/transparencia').then((res) => {
      let data = res.data.data.vacinas
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
        data: values,
        backgroundColor: ['#00B3F3', "#1E293B"],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
          display: true,
          text: 'Porcentagem de vacinas tomadas'
      }
    }
  };

  return (
    <div className="pie-chart my-chart">
      <Pie data={data} options={options}/>
    </div>
  )
  
}

export default PieChart;