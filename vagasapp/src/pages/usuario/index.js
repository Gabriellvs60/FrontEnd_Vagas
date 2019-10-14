import React, { Component } from 'react';
import './styles.css';

import {
    Card, Button, CardHeader, Col, CardBody,
    CardTitle, CardText
} from 'reactstrap';

export default class Usuario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params,
            usuario: false
        }
    }

    //tutorial aqui: https://youtu.be/bE4q8Eg6DK0
    componentDidMount() {
        const path = "http://localhost:4000/usuarios/"
        const { id } = this.props.match.params;
        //alert(id)
        const url = path.concat(id);
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-TYpe': 'application/json',
            }
        }).then((result) => {
            result.json().then((resp) => {
                this.setState({ usuario: resp })
            })
        })
    }
    
    returnToMain = () => {
        //props especial do react para as rotas
        //volta para o menu inicial
        this.props.history.push('/');
    }

    render() {
        /* var id = this.props.match.params.id;
        alert(id); */
        var usuario = this.state.usuario;
        console.log(usuario);

        return (
            <div className="userInfo">
                <Col sm="12" md={{ size: 6, offset: 3 }}> 
                <Card>
                    <CardHeader className="cardName">{usuario.nome}</CardHeader>
                    <CardBody>
                        <CardText>Vaga: {usuario.nomeVaga}</CardText>
                        <CardText>Email: {usuario.email}</CardText>
                        <CardText>Data de Nascimento: {usuario.dataNascimento}</CardText>
                        <Button className="btn_alterar btn-alert" onClick={(e) => this.returnToMain(e)}>VOLTAR</Button>
                    </CardBody>
                </Card>
                </Col>
             
            </div>
        )
    }
}