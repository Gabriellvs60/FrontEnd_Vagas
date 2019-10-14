import React, {Component} from 'react';
import "./styles.css";
import {Link} from 'react-router-dom';


export default class Main extends Component{
    
    constructor(props){
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
      }

      componentDidMount(){
        let url = "http://localhost:4000/usuarios"
        fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded : true,
            items: json,
          })
        });
      }
      
      handleClick = () => {
        this.props.history.push('/cadastroUsuario');
      }

      render(){
        var {isLoaded, items} = this.state;
    
        if(!isLoaded){
          return <div>Carregando...</div>
        }
        else{
            return (
                <div className="main">
                <div className="button">
                <p>Usuarios</p>
                <button onClick={(e) => this.handleClick(e)}>
                 Click me
                </button>
                </div>
                <div className="tableUsuarios" >
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Vaga</th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map(item => (
                        <tr className="rowLink">
                        <Link to={`/usuarios/${item.id}`}><td className="idUser" >{item.id}</td></Link>
                          <td>{item.nome}</td>
                          <td>{item.nomeVaga}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                </div>
            );
          }
    }
}