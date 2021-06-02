import { React, useState } from 'react';
import './agendamento.scss';

import { Modal } from 'react-bootstrap/'

import vacinaIcon from '../../assets/vacina-icon2.svg';
import localIcon from '../../assets/local-icon.svg';
import calendarFilledIcon from '../../assets/calendar-filled-icon.svg';
import timeIcon from '../../assets/time-icon.svg';

const Agendamento = ({campanha, status, local, data, horario}) => {
  const [modalShow, setModalShow] = useState(false);

  const cancelarButton = status === "Agendado" ? <div className="agendamento-action action-cancelar">Cancelar</div> : null;

  const print = () => {
    window.print();
  }

  return (

    <div className="agendamento">
      <div className="my-row align-items-center px-3">
        <img src={vacinaIcon} className="vacina-icon" alt="vacina-icon"/>
        <div className="campanha-box">
          <div className="vacina-label">Vacina</div>
          <div className="campanha">{campanha}</div>
        </div>

        <div className={`agendamento-status ${status === 'Agendado' ? 'status-agendado' : 'status-cancelado'}`}>{status}</div>
      </div>

      <hr />

      <div className="my-row align-items-center mb-3 mt-1 px-3">
        <img src={localIcon} className="agendamento-main-icon" alt="local-icon"/>
        <div className="agendamento-main-text">{local}</div>
      </div>

      <div className="my-row align-items-center justify-content-between mb-3 px-3">
        <div className="my-row align-items-center">
          <img src={calendarFilledIcon} className="agendamento-main-icon" alt="calendar-icon" />
          <div className="agendamento-main-text">{data.replace(/-/g, '/')}</div>
        </div>

        <div className="my-row align-items-center">
          <img src={timeIcon} className="agendamento-main-icon" alt="time-icon"/>
          <div className="agendamento-main-text">{horario}</div>
        </div>
      </div>

      <div className="agendamento-actions">
        <div 
          className={`agendamento-action action-detalhar ${status !== 'Agendado' ? 'rounded-bottom' : null}`}
          onClick={() => { setModalShow(true) }}
        >
          Detalhes
        </div>
        {cancelarButton}
      </div>


      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-custom"
        id="comprovante"
      >
        <Modal.Body>
          <h5 className="title text-primary mb-3">Comprovante de agendamento</h5>

          <div className="my-row mb-3">
            <h6 className="title text-secondary mr-4">{data.replace(/-/g, '/')} - {horario}</h6>
            <h6 className={`title ${status === "Agendado" ? 'text-success' : 'text-danger'}`}>{status}</h6>
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
            <span className="text-secondary">{local}</span>
          </div>
          <div className="agendamento-info">
            <span className="title text-secondary mr-2">Vacina:</span>
            <span className="text-secondary">Coronavac - Buntantan</span>
          </div>


        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button className="btn btn-primary print-button mt-5 btn-lineup" onClick={print}>Imprimir</button>
          <button className="btn btn-danger" onClick={() => setModalShow(false)}>
            Cancelar Agendamento
          </button>
          <button className="btn btn-light  btn-lineup" onClick={() => setModalShow(false)}>Fechar</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}


export default Agendamento