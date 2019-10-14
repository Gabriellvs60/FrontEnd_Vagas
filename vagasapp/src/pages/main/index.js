import React, { Component } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        let url = "http://localhost:4000/usuarios"
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }

    handleClick = () => {
        //props especial do react para as rotas
        this.props.history.push('/cadastroUsuario');
    }
 
    callRoute (e) {
        alert(e.target.value);
    }
    

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Carregando...</div>
        }
        else {
            return (
                <div className="main">

                    <div className="button">
                        <p>Usuarios</p>
                        <button onClick={(e) => this.handleClick(e)}>
                            Click me
                </button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr className="rowLink" >
                                    <td className="idUser" value="1" onClick={e => this.callRoute(e, "value")}>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.nomeVaga}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}