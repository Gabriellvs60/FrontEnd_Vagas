import React, { Component } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

import {Table, Button, Form, FormGroup, Label, Row}
from'reactstrap';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:"null",
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
 
    //tentando pegar o valor do id na td da table
  /*   callRoute = (e) => {
        this.setState({[e.target.name]: e.target.value})
        alert(this.state.id)
    } */
   
    render() {
        var { isLoaded, items, id } = this.state;
        if (!isLoaded) {
            return <div>Carregando...</div>
        }
        else {
            return (
                <div className="main">

                    <div className="button">
                        <Form>
                            <FormGroup className="form">
                            <Row form> 
                            <Label className="lb_users">Usuarios</Label>
                            <Button onClick={(e) => this.handleClick(e)} className="btn_criar btn-dark">CRIAR</Button>
                            </Row>
                            </FormGroup>
                        </Form>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Username</th>
                                <th>Excluir/Alterar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr className="rowLink" >
                                    <Link to={`/usuarios/${item.id}`}><td className="idUser">{item.id}</td></Link>
                                    <td>{item.nome}</td>
                                    <td>{item.nomeVaga}</td>
                                    <td><Button className="btn_excluir btn-danger">Excluir</Button></td>
                                    <td><Button className="btn_excluir btn-alert">Alterar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}