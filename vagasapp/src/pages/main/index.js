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
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr className="rowLink" >
                                    <td className="idUser" value={id} onClick={e => this.callRoute(e, "value")}>{item.id}</td>
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