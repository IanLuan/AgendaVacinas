import React, { useState, useEffect } from 'react';
import { useViewport } from '../../../useViewport';
import './agendamentosView.scss';

import api from '../../../services/api';

import Pagination from 'react-bootstrap/Pagination'
import Select from '../../../components/Select/Select';
import Agendamento from '../../../components/Agendamento/Agendamento';
import filterIcon from '../../../assets/filter-icon.svg';
import chevronRight from '../../../assets/chevron-right.svg'


const Agendamentos = () => {
  const { width } = useViewport();
  const breakpoint = 1200;

  const [agendamentos, setAgendamentos] = useState([]);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState();

  const [dates, setDates] = useState([]);
  const [date, setDate] = useState();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState();

  const getAgendamentos = async ()  =>  {
    const response = await api.get('/agendamentos')
      .then((res) => {
        let agendamentos = res.data.data;
        let place = [...new Set(agendamentos.map((item) => item['localizacao']))]
        let dates = [...new Set(agendamentos.map((item) => item['data'].replace(/-/g, '/')))];
        
        
        setAgendamentos(agendamentos);
        setPlaces(place);
        setDates(dates);
      })
  }

  useEffect(() => {
    getAgendamentos();
    width >= breakpoint ? setPageSize(4) : setPageSize(3);
  }, [])

  let items = [];
  for (let number = 1; number <= Math.ceil(agendamentos.length / pageSize); number++) {
    items.push(
      <Pagination.Item key={number} active={number === pageNumber} onClick={()=> {setPageNumber(number)}}>
        {number}
      </Pagination.Item>,
    );
  }

  const handleChangeItem = (direction) => {
    if(direction === "right" && pageNumber < Math.ceil(agendamentos.length / pageSize) ) {
      setPageNumber(pageNumber + 1);
    } else if(direction === "left" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }
  
  return (
    <div className="agendamentos-view">
      <div className="white-curve"></div>
      <div className="main-column">
        <h1 className="title section-title">Meus agendamentos</h1>

        <div className="filter-agendamentos mt-4">
          Filtrar agendamento
          <div className="my-row align-items-center mt-2">
            <img src={filterIcon} className="filter-icon" />

            <Select className="select-place" options={places} />
            <Select className="select-date" options={dates} />
          </div>
          
          <div className="my-row mt-3 agendamentos-row">
            { agendamentos.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map((agendamento, index) => (
              <div className="agendamento-wrapper" key={index}>
                <Agendamento 
                  campanha={agendamento.vacina} 
                  status={agendamento.status} 
                  local={agendamento.localizacao} 
                  data={agendamento.data} 
                  horario={agendamento.horario}
                />
              </div>
            ))}
          </div>

          <div className="my-row justify-content-end mt-3">
            <Pagination>
              <li onClick={() => { handleChangeItem('left') }} className={`page-item ${pageNumber > 1 ? '' : 'disabled-item'}`}>
                <div className="page-link">
                  <img src={chevronRight} className="prev-page"/>
                </div>
              </li>
              {items}
              <li onClick={() => { handleChangeItem('right') }} className={`page-item ${pageNumber < Math.ceil(agendamentos.length / pageSize) ? '' : 'disabled-item'}`}>
                <div className={`page-link`}>
                  <img src={chevronRight} className="next-page"/>
                </div>
              </li>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
  

}

export default Agendamentos