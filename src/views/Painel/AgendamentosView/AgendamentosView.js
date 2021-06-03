import React, { useState, useEffect } from 'react';
import { useViewport } from '../../../useViewport';
import './agendamentosView.scss';

import api from '../../../services/api';

import Pagination from 'react-bootstrap/Pagination'
import Select from '../../../components/Select/Select';
import Agendamento from '../../../components/Agendamento/Agendamento';
import BarChart from '../../../components/Charts/BarChart';
import PieChart from '../../../components/Charts/PieChart';
import filterIcon from '../../../assets/filter-icon.svg';
import chevronRight from '../../../assets/chevron-right.svg'
import MobileHeader from '../../../components/MobileHeader/MobileHeader';



const Agendamentos = () => {
  const { width } = useViewport();
  const breakpoint = 1200;

  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentosNoFilter, setAgendamentosNoFilter] = useState([]);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState('');

  const [dates, setDates] = useState([]);
  const [date, setDate] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState();

  const getAgendamentos = async ()  =>  {
    await api.get('/agendamentos')
      .then((res) => {
        let agendamentos = res.data.data;
        let places = [...new Set(agendamentos.map((item) => item['localizacao']))]
        let dates = [...new Set(agendamentos.map((item) => item['data'].replace(/-/g, '/')))];
        
        
        setAgendamentos(agendamentos);
        setAgendamentosNoFilter(agendamentos);
        setPlaces(places);
        setDates(dates);
      })
  }

  useEffect(() => {
    let mounted = true;
    getAgendamentos();
    return () => mounted = false;
  }, [])

  useEffect(() => {
    width >= breakpoint ? setPageSize(4) : setPageSize(3);
  }, [width])



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

  const filterByPlace = (placeToFilter) => {
    setPlace(placeToFilter);
    handleFilter(placeToFilter, date);
  }

  const filterByDate = (dateToFilter) => {
    setDate(dateToFilter);
    handleFilter(place, dateToFilter);
  }

  const handleFilter = (placeToFilter, dateToFilter) => {
    let agendamentosFiltered = agendamentosNoFilter;

    if(placeToFilter !== ""){
      agendamentosFiltered = agendamentosFiltered.filter(agendamento => agendamento.localizacao === placeToFilter);
    }

    if(dateToFilter !== ""){
      agendamentosFiltered = agendamentosFiltered.filter(agendamento => agendamento.data.replace(/-/g, '/') === dateToFilter);
    }

    setAgendamentos(agendamentosFiltered);
    setPageNumber(1);
  }

  
  return (
    <div className="agendamentos-view painel-view">
      <div className="white-curve"></div>
      <div className="main-column">
        <MobileHeader />
        <h1 className="title section-title">Meus agendamentos</h1>

        <div className="filter-agendamentos mt-4">
          Filtrar agendamento
          <div className="my-row align-items-center mt-2 filter-row">
            <img src={filterIcon} className="filter-icon" />
            <div className="filter-row-selects">
              <Select id="select-place" className="select-place" options={places} startOption="Local de vacinação" onChoose={filterByPlace}/>
              <Select id="select-date" className="select-date" options={dates} startOption="Data de vacinação" onChoose={filterByDate}/>
            </div>
          </div>
          
          <div className="my-row mt-3 agendamentos-row">
            { agendamentos
                .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
                .map((agendamento, index) => (
                  <div className="agendamento-wrapper" key={index}>
                    <Agendamento 
                      campanha={agendamento.vacina} 
                      status={agendamento.status} 
                      local={agendamento.localizacao} 
                      data={agendamento.data} 
                      horario={agendamento.horario}
                    />
                  </div>
                ))
            }
          </div>

          <div className="my-row pagination-row  mt-3">
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
        
        <h2 className="title section-title mb-4">Transparência</h2>

        <div className="my-row graficos-row">
          <div className="pie-chart-wrapper my-card">
            <PieChart />
          </div>

          <div className="bar-chart-wrapper my-card">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
  

}

export default Agendamentos