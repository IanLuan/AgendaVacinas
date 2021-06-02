import React from 'react';
import './disponivel.scss';

const Disponivel = ({horario, disponiveis, onChoose}) => {
  
  return (
    <div className={`disponivel-card ${ disponiveis === 0 ? 'indisponivel' : ''}`}>
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