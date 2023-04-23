import './App.css';
import pokeball from './img/pokeball.png'
import {useState} from "react";
import axios from "axios";
import moment from "moment";

function App() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [abilities, setAbilities] = useState('');
    const [hp, setHp] = useState('');
    const [releaseDate, setreleaseDate] = useState('');

    const sId = (event) => {
        setId(event.target.value)
    }

    const sName = (event) => {
        setName(event.target.value)
    }

    const sAbilities = (event) => {
        setAbilities(event.target.value)
    }

    const sHp = (event) => {
        setHp(event.target.value)
    }

    const sReleaseDate = (event) => {
        setreleaseDate(event.target.value)
    }

    async function gerarBinario() {
        await axios.get("http://localhost:8080/pokemonsbinario")
    }

    async function pesquisar() {
        await axios.get("http://localhost:8080/pokemon", {params: {id: id}})
            .then(function (response) {
                setId(response.data.Id ? response.data.Id : "")
                setName(response.data.Name ? response.data.Name : "")
                setAbilities(response.data.Abilities ? response.data.Abilities.toString() : "")
                setHp(response.data.HP ? response.data.HP : "")
                setreleaseDate(response.data.ReleaseDate ? moment(response.data.ReleaseDate).format("yyyy-MM-DD") : "")
            })
    }

    async function alterar() {
        await axios.put("http://localhost:8080/pokemon", {data: {id: id, name: name, abilities: abilities.split(","), hp: hp, releaseDate: releaseDate}})
    }

    async function adicionar() {
        await axios.post("http://localhost:8080/pokemon", {data: {name: name, abilities: abilities.split(","), hp: hp, releaseDate: releaseDate}})
    }

    async function remover() {
        await axios.delete("http://localhost:8080/pokemon", {params: {id: id}})
            .then(function (response) {
                setId("")
                setName("")
                setAbilities("")
                setHp("")
                setreleaseDate("")
            })
    }

  return (
    <div className="App">
      <div className="pokedex">
          <img src={pokeball} alt=""/><br/>
          <>
              <label >Id:</label>
              <br/>
              <input type="number" required={true} name="id" onChange={sId} value={id}/>
              <br/>
          </>
          <>
              <label>Nome:</label>
              <br/>
              <input type="text" required={true} name="name" onChange={sName} value={name}/>
              <br/>
          </>
          <>
              <label>Habilidades:</label>
              <br/>
              <input type="text" required={true} name="abilities" onChange={sAbilities} value={abilities}/>
              <br/>
          </>
          <>
              <label>HP:</label>
              <br/>
              <input type="number" required={true} name="hp" onChange={sHp} value={hp}/>
              <br/>
          </>
          <>
              <label>Data de lançamento:</label>
              <br/>
              <input type="date" required={true} name="releaseDate" onChange={sReleaseDate} value={releaseDate}/>
              <br/>
          </>
          <button className="botao" onClick={gerarBinario}>Gerar binário</button>
          <button className="botao" onClick={pesquisar}>Pesquisar</button>
          <button type="submit" className="botao" onClick={adicionar}>Adicionar</button>
          <button type="submit" className="botao" onClick={alterar}>Alterar</button>
          <button type="submit" className="botao" onClick={remover}>Remover</button>
      </div>
    </div>
  );
}

export default App;
