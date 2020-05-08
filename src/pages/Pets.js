import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import PetsList from '../components/PetsList';
import NewPet from '../components/NewPet';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loader from '../components/Loader';

export const typeDefs = gql`
  extend type Pet {
    isVaccinated: Boolean!
  }
`;

export const resolvers = {
  Pet: {
    isVaccinated() {
      return true;
    }
  }
}

const PET_FIELDS = gql`
  fragment PetFields on Pet {
    id
    name
    type
    img
    isVaccinated @client
  }
`;

const GET_PETS = gql`
  query Pets {
    pets {
      ...PetFields
    }
  }
  ${PET_FIELDS}
`;

const CREATE_PET = gql`
  mutation Pet($newPet: NewPetInput!) {
    pet(input: $newPet) {
      ...PetFields
    }
  }
  ${PET_FIELDS}
`;

export default function Pets () {
  const [modal, setModal] = useState(false);
  const {data, loading, error} = useQuery(GET_PETS);
  const [createNewPet, newPetData] = useMutation(
    CREATE_PET,
    {
      update(cache, { data: { pet } }) {
        const { pets } = cache.readQuery({query: GET_PETS});
        cache.writeQuery({
          query: GET_PETS,
          data: { pets: [pet, ...pets] }
        });
      }
    }
  );

  const onSubmit = input => {
    createNewPet({
      variables: {
        newPet: input
      },
      optimisticResponse: {
        __typeName: "Mutation",
        pet: {
          __typeName: 'Pet',
          id: '11',
          name: 'Placeholder',
          type: 'DOG',
          img: 'https://placedog.net/500',
          isVaccinated: false
        }
      }
    });
    setModal(false);
  }

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)}/>
        </div>
      </div>
    )
  }

  if(loading) {
    return <Loader />;
  }

  if(error || newPetData.error) {
    return <Error />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <PetsList pets={data.pets}/>
        </div>
      </section>
    </div>
  )
}
