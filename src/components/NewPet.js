import React, {useState} from 'react'
import Select from 'react-select'

const options = [
  { value: 'CAT', label: 'Cat' },
  { value: 'DOG', label: 'Dog' }
]

export default function NewPet({onSubmit, onCancel}) {
  const [type, setType] = useState('DOG')
  const [name, setName] = useState('')

  const activeOption = options.find(o => o.value === type)

  const submit = e => {
    e.preventDefault()
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        response.json().then(data => {
          return data.status === 'success' ?
          onSubmit({name, type, img: data.message}) :
          onSubmit({name, type, img: 'https://placedog.net/500'});
        })
      });
  }

  const cancel = e => {
    e.preventDefault();
    onCancel();
  }

  return (
    <div className="new-pet page">
      <h1>New Pet</h1>
      <div className="box">
        <form onSubmit={submit}>
          <Select
            value={activeOption}
            defaultValue={options[0]}
            onChange={e => setType(e.value)}
            options={options}
          />

          <input
            className="input"
            type="text"
            placeholder="pet name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <a className="error button" onClick={cancel}>Cancel</a>          
          <button type="submit" name="submit">Add Pet</button>
        </form>
      </div>
    </div>
  )
}
