import React from 'react';
import './disponivel.scss';

const Disponivel = ({horario, local, data, disponiveis, onChoose}) => {
  
  return (
    <div onClick={() => {onChoose(horario, local, data)}} className={`disponivel-card ${ disponiveis === 0 ? 'indisponivel' : ''}`}>
      <div className="disponivel-half">
        {horario.replace("h", ":00")}
      </div>

      <div className="disponivel-half">
        {disponiveis} vagas
      </div>
    </div>
  );
}


export default Disponivel