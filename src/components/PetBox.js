import React from 'react'

const PetBox = ({pet}) => (
  <div className="pet">
    <figure>
      <img src={pet.img} alt=""/>
    </figure>
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
  </div>
)

export default PetBox
