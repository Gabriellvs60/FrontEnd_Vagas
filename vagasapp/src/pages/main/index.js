import React, { Component } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom';

import { Table, Button, Form, FormGroup, Label, Row }
    from 'reactstrap';

//icones dos botões
import { Edit, Delete } from '@material-ui/icons';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "null",
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

    deleteItem = id => {
        let confirmDelete = window.confirm('Deseja Realmente deletar o item')
        if (confirmDelete) {
            fetch('http://localhost:4000/usuarios/' + id, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.json())
                .then(item => {
                    this.props.deleteItemFromState(id)
                })
                .catch(err => console.log(err))
        }
    }

    updateItem = id => {
        alert("editar")
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
                                <th>Vaga</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr className="rowLink" key={item.id} >
                                    <td className="tdAction">{item.id}</td>
                                    <td className="tdAction">{item.nome}</td>
                                    <td className="tdAction">{item.nomeVaga}</td>
                                    <td>
                                        <Edit className="btnEdit" onClick={() => this.updateItem(item.id)}></Edit>
                                        <Delete className="btnDelete" onClick={() => this.deleteItem(item.id)}></Delete>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}