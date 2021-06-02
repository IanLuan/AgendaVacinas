import React, { useState, useEffect } from 'react';
import { useViewport } from '../../../useViewport';
import './agendarView.scss';
import api from '../../../services/api';

import Select from '../../../components/Select/Select';
import TextField from '../../../components/TextField/TextField';
import Disponivel from '../../../components/Disponivel/Disponivel';
import chevronRight from '../../../assets/chevron-right.svg'


const AgendarView = () => {

  const { width } = useViewport();
  const breakpoint = 1200;

  const [disponiveis, setDisponiveis] = useState([]);
  const [disponiveisNoFilter, setDisponiveisNoFilter] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipio, setMunicipio] = useState('');
  const [date, setDate] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;

  const getDisponiveis = async ()  =>  {
    const response = await api.get('/agendar/disponibilidade')
      .then((res) => {
        let disponiveis = res.data.data;
        let municipios = [...new Set(disponiveis.map((item) => item['municipio']))]        
        
        setDisponiveis(disponiveis);
        setDisponiveisNoFilter(disponiveis);
        setMunicipios(municipios);
      })
  }

  useEffect(() => {
    getDisponiveis();
      
  }, [])

  const filterByCampanha = () => {}

  const filterByMunicipio = (municipioToFilter) => {
    setMunicipio(municipioToFilter);
  }

  // const handleFilter = () => {
  //   let agendamentosFiltered = agendamentosNoFilter;

  //   if(placeToFilter !== ""){
  //     agendamentosFiltered = agendamentosFiltered.filter(agendamento => agendamento.localizacao === placeToFilter);
  //   }

  //   if(dateToFilter !== ""){
  //     agendamentosFiltered = agendamentosFiltered.filter(agendamento => agendamento.data.replace(/-/g, '/') === dateToFilter);
  //   }

  //   setAgendamentos(agendamentosFiltered);
  //   setPageNumber(1);
  // }


  return (

    <div className="agendar-view painel-view">
      <div className="white-curve"></div>
        <div className="main-column">
          <h1 className="title section-title">Agendar</h1>

          <div className="row justify-content-between align-items-start main-row">
            <div className="my-card justify-content-between agendar-filter">
              <form className="row g-3 needs-validation my-col" noValidate >

                <Select id="select-campanha" className="mb-3" label="Campanha" options={["Covid-19"]} startOption="Todas as campanhas" onChoose={filterByCampanha} />
                <Select id="select-municipio" className="mb-3" label="Municipio" options={municipios} startOption="Todos os municípios" onChoose={filterByMunicipio} />
                <TextField id="date-field" type="date" label="Data" />
                <button className="btn btn-primary btn-block font-bold" type="submit">Procurar</button>

              </form>
            </div>

            <img src={chevronRight} className="chevron-icon" />

            <div className="my-card agendar-disponiveis">
              <h1 className="title section-title mb-2">Locais de vacinação { date ? `- ${date}` : "" }</h1>
              
              {
                disponiveis.map((localDisponivel, index) => 
                  <>
                  <div className="my-col locais-disponiveis mb-4 mt-4" key={index}>
                    <span className="text-secondary locais-disponiveis-header mb-3">{localDisponivel.localizacao} | Covid-19 | 8h às 16h</span>
                    <div className="disponiveis-row">
                    {
                      Object.entries(localDisponivel.vagas).map((disponivel, disponivelIndex) => 
                        <Disponivel horario={disponivel[0]} disponiveis={disponivel[1]} key={disponivelIndex} />
                      )
                    }
                    </div>
                  </div>
                  <hr />
                  </>
                )
              }

              
            </div> 

          </div>
        </div>
    </div>
  );
}

export default AgendarView