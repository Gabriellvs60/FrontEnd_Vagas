import React, {Component} from 'react';
import './styles.css';

export default class Usuario extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params,
            usuario:false
        }
      }

      //tutorial aqui: https://youtu.be/bE4q8Eg6DK0
      componentDidMount()
      {
        const path = "http://localhost:4000/usuarios/"
        const {id} = this.props.match.params;
        //alert(id)
        const url = path.concat(id);
          fetch (url,{
              method:'GET',
              headers:{
                  'Accept': 'application/json',
                  'Content-TYpe' : 'application/json',
              }
          
        }).then((result) => {
            result.json().then((resp) => {
                this.setState({usuario:resp})
            })
        })
      }

    render(){
        /* var id = this.props.match.params.id;
        alert(id); */ 
        var usuario = this.state.usuario;
        console.log(usuario);
        
        return (
        <div className="userInfo">
            <h1>{usuario.nome}</h1>
            <a>Vaga : {usuario.nomeVaga}</a>
            <p>Data de Nascimento : {usuario.dataNascimento}</p>
            <p>Email : {usuario.email}</p>
        </div>
        )
    }
}