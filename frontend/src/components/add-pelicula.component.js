import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";

export default class AddPelicula extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeAno = this.onChangeAno.bind(this);
    this.onChangeEstilo = this.onChangeEstilo.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeActor = this.onChangeActor.bind(this);
    this.savePelicula = this.savePelicula.bind(this);
    this.newPelicula = this.newPelicula.bind(this);

    this.state = {
        id: null,
        nombre: "",
        ano: null,
        estilo:"",
        id_director:null,
        id_actor:[],

      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeAno(e) {
    this.setState({
      ano: e.target.value
    });
  }

  onChangeEstilo(e) {
    this.setState({
      estilo: e.target.value
    });
  }

  onChangeDirector(e) {
    this.setState({
      id_director: e.target.value
    });
  }

  onChangeActor(e) {
    var actor_str = e.target.value.split(",")
    var actor_id = actor_str.map(function (x) {
      return parseInt(x, 10);
    })
    this.setState({
      id_actor:actor_id,
    });
  }

  savePelicula() {
    var data = {
      id: this.state.id,
      nombre: this.state.nombre,
      ano: this.state.ano,
      estilo: this.state.estilo,
      id_director: this.state.id_director,
      id_actor: this.state.id_actor,
    };

    PeliculaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          ano: response.data.ano,
          estilo: response.data.estilo,
          id_director: response.data.id_director,
          id_actor: response.data.id_actor,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPelicula() {
    this.setState({
      id: null,
      nombre: "",
      ano: null,
      estilo: "",
      id_director: null,
      id_actor: [],

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPelicula}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                type="number"
                className="form-control"
                id="id"
                required
                value={this.state.id}
                onChange={this.onChangeId}
                name="id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ano">Año</label>
              <input
                type="number"
                className="form-control"
                id="ano"
                required
                value={this.state.ano}
                onChange={this.onChangeAno}
                name="ano"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estilo">Estilo</label>
              <input
                type="text"
                className="form-control"
                id="estilo"
                required
                value={this.state.estilo}
                onChange={this.onChangeEstilo}
                name="estilo"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="id_director">Director</label>
              <input
                type="number"
                className="form-control"
                id="id_director"
                required
                value={this.state.id_director}
                onChange={this.onChangeDirector}
                name="id_director"
              />
            </div>

            <div className="form-group">
              <label htmlFor="id_actor">Actores</label>
              <input
                type="text"
                className="form-control"
                id="id_actor"
                required
                value={this.state.id_actor}
                onChange={this.onChangeActor}
                name="id_actor"
              />
            </div>

            <button onClick={this.savePelicula} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}