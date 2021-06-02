import React, { useState, useEffect } from 'react';
import { useViewport } from '../../../useViewport';
import './agendarView.scss';
import api from '../../../services/api';

import { Modal } from 'react-bootstrap/'
import Select from '../../../components/Select/Select';
import TextField from '../../../components/TextField/TextField';
import Disponivel from '../../../components/Disponivel/Disponivel';
import MobileHeader from '../../../components/MobileHeader/MobileHeader';
import chevronRight from '../../../assets/chevron-right.svg'


const AgendarView = () => {

  const { width } = useViewport();
  const breakpoint = 1200;

  const [disponiveis, setDisponiveis] = useState([]);
  const [disponiveisNoFilter, setDisponiveisNoFilter] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipio, setMunicipio] = useState('');
  const [date, setDate] = useState('');
  const [dateText, setDateText] = useState('');
  const [horarioEscolhido, setHorarioEscolhido] = useState();
  const [localEscolhido, setLocalEscolhido] = useState();
  const [dataEscolhida, setDataEscolhida] = useState();
  const [modalConfirmarShow, setModalConfirmarShow] = useState(false);
  const [modalComprovanteShow, setModalComprovanteShow] = useState(false);

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

  const getDisponiveisByDate = async (date)  =>  {
    const response = await api.get(`/agendar/disponibilidade/${date}`)
      .then((res) => {
        let disponiveis = res.data.data;

        if(municipio !== ""){
          disponiveis = disponiveis.filter(disponivel => disponivel.municipio === municipio);
        }
        
        setDateText(date)
        setDisponiveis(disponiveis);
        setPageNumber(1);
      })
  }

  const handleChangeDate = (e) => {
    let date = e.target.value;
    date = date.split("-").reverse().join("-")
    setDate(date)
  }

  const filterByCampanha = () => {}

  const filterByMunicipio = (municipioToFilter) => {
    setMunicipio(municipioToFilter);
  }

  const handleFilter = (e) => {
    e.preventDefault()

    getDisponiveisByDate(date)
  }

  const agendar = (horario, local, data) => {
    setHorarioEscolhido(horario);
    setLocalEscolhido(local);
    setDataEscolhida(data);

    setModalConfirmarShow(true)
  }


  return (

    <div className="agendar-view painel-view">
      <div className="white-curve"></div>
        <div className="main-column">

          <MobileHeader />

          <h1 className="title section-title">Agendar</h1>

          <div className="row justify-content-between align-items-start main-row">
            <div className="my-card justify-content-between agendar-filter">
              <form className="row g-3 needs-validation my-col" noValidate >

                <Select id="select-campanha" className="mb-3" label="Campanha" options={["Covid-19"]} startOption="Todas as campanhas" onChoose={filterByCampanha} />
                <Select id="select-municipio" className="mb-3" label="Municipio" options={municipios} startOption="Todos os municípios" onChoose={filterByMunicipio} />
                <TextField id="date-field" type="date" label="Data" onChange={handleChangeDate} />
                <button className="btn btn-primary btn-block font-bold" onClick={handleFilter}>Procurar</button>

              </form>
            </div>

            <img src={chevronRight} className="chevron-icon" />

            <div className="my-card agendar-disponiveis">
              <h1 className="title section-title mb-2">Locais de vacinação { dateText ? `- ${dateText.replace(/-/g, '/')}` : "" }</h1>
              
              {
                disponiveis.map((localDisponivel, index) => 
                  <div key={index}>
                  <div className="my-col locais-disponiveis mb-4 mt-4" key={index}>
                    <span className="text-secondary locais-disponiveis-header mb-3" >{localDisponivel.localizacao} | Covid-19 | 8h às 16h | {localDisponivel.data.replace(/-/g, '/')}</span>
                    <div className="disponiveis-row">
                    {
                      Object.entries(localDisponivel.vagas).map((disponivel, disponivelIndex) => 
                        <Disponivel onChoose={agendar} horario={disponivel[0]} local={localDisponivel.localizacao} data={localDisponivel.data} disponiveis={disponivel[1]} key={disponivelIndex} />
                      )
                    }
                    </div>
                  </div>
                  <hr />
                  </div>
                )
              }
            </div> 

            <Modal
              show={modalConfirmarShow}
              onHide={() => setModalConfirmarShow(false)}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              dialogClassName="modal-custom"
              scrollable
              id="comprovante"
            >
              <Modal.Body>
                <h5 className="title text-primary mb-3">Confirme seu agendamento</h5>

                <div className="my-row mb-3">
                  <h6 className="title text-secondary mr-4">Horário: {horarioEscolhido}</h6>
                </div>
                <div className="my-row mb-3">
                  <h6 className="title text-secondary mr-4">Data: {dataEscolhida}</h6>
                </div>
                <div className="my-row mb-3">
                  <h6 className="title text-secondary mr-4">Local: {localEscolhido}</h6>
                </div>
                <div className="my-row mb-3">
                  <h6 className="title text-secondary mr-4">Vacina: Coronavac - Buntantan</h6>
                </div>


              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-light" onClick={() => setModalConfirmarShow(false)}>Fechar</button>
                <button className="btn btn-success" onClick={() => {setModalConfirmarShow(false); setModalComprovanteShow(true);}}>Cofirmar agendamento</button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={modalComprovanteShow}
              onHide={() => setModalComprovanteShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              dialogClassName="modal-custom"
              scrollable
              id="comprovante"
            >
              <Modal.Body>
                <h5 className="title text-primary mb-3">Comprovante de agendamento</h5>

                <div className="my-row mb-3">
                  <h6 className="title text-secondary mr-4">dataEscolhida - {horarioEscolhido}</h6>
                  <h6 className={`title text-success`}>Agendado</h6>
                </div>
                
                <div className="text-secondary title orientacoes-title mb-2">Orientações</div>
                <ul>
                  <li className="orientacoes-item text-danger mb-2">Caso sejam informados dados falsos relacionados ao seu agendamento, ele poderá ser cancelado a critério do vacinador ou supervisor da sala de vacina (Art. 299 - Código Penal)</li>
                  <li className="orientacoes-item text-danger mb-2">Você poderá cancelar seu agendamento com até 24h de antecedência. Em caso de não comparecimento, um novo agendamento será permitido após 48h do agendamento anterior.</li>
                  <li className="orientacoes-item text-danger mb-2">O horário de agendamento poderá sofrer alterações, caso surjam problemas logísticos identificados pelo supervisor da sala de vacina</li>
                </ul>

                <div className="agendamento-info mt-4">
                  <span className="title text-secondary mr-2">Cidadão:</span>
                  <span className="text-secondary">José da Silva Sauro</span>
                </div>
                <div className="agendamento-info">
                  <span className="title text-secondary mr-2">Localização:</span>
                  <span className="text-secondary">{localEscolhido}</span>
                </div>
                <div className="agendamento-info">
                  <span className="title text-secondary mr-2">Vacina:</span>
                  <span className="text-secondary">Coronavac - Buntantan</span>
                </div>


              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-light print-button" onClick={() => window.print()}>Imprimir</button>
                <button className="btn btn-light" onClick={() => setModalComprovanteShow(false)}>Fechar</button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
    </div>
  );
}

export default AgendarView