import React from 'react'
import PetBox from '../components/PetBox';

const PetsList = ({pets}) => (
  pets.map(pet => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetBox pet={pet} />
      </div>
    </div>
  ))
);

export default PetsList
