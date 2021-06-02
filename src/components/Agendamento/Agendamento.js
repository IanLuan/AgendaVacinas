import React from 'react';
import './agendamento.scss';

import vacinaIcon from '../../assets/vacina-icon2.svg';
import localIcon from '../../assets/local-icon.svg';
import calendarFilledIcon from '../../assets/calendar-filled-icon.svg';
import timeIcon from '../../assets/time-icon.svg';

const Agendamento = ({campanha, status, local, data, horario}) => {
  
  const cancelarButton = status === "Agendado" ? <div className="agendamento-action action-cancelar">Cancelar</div> : null;

  return (

    <div className="agendamento">
      <div className="my-row align-items-center px-3">
        <img src={vacinaIcon} className="vacina-icon" />
        <div className="campanha-box">
          <div className="vacina-label">Vacina</div>
          <div className="campanha">{campanha}</div>
        </div>

        <div className={`agendamento-status ${status === 'Agendado' ? 'status-agendado' : 'status-cancelado'}`}>{status}</div>
      </div>

      <hr />

      <div className="my-row align-items-center mb-3 mt-1 px-3">
        <img src={localIcon} className="agendamento-main-icon" />
        <div className="agendamento-main-text">{local}</div>
      </div>

      <div className="my-row align-items-center justify-content-between mb-3 px-3">
        <div className="my-row align-items-center">
          <img src={calendarFilledIcon} className="agendamento-main-icon" />
          <div className="agendamento-main-text">{data.replace(/-/g, '/')}</div>
        </div>

        <div className="my-row align-items-center">
          <img src={timeIcon} className="agendamento-main-icon" />
          <div className="agendamento-main-text">{horario}</div>
        </div>
      </div>

      <div className="agendamento-actions">
        <div 
          className={`agendamento-action action-detalhar ${status !== 'Agendado' ? 'rounded-bottom' : null}`}
        >
          Detalhes
        </div>
        {cancelarButton}
      </div>
    </div>
  );
}


export default Agendamento