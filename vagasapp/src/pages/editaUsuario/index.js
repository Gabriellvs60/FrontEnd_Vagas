import React, { Component } from 'react';
import './styles.css';

import api from '../../services/api';

import { Button, Form, FormGroup, Label, Input, Alert }
    from 'reactstrap';

export default class EditaUsuario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: {
                text: '',
                alert: ''
            },
            id: this.props.match.params,
            usuario: false,
            //estados usados para coleta dos inputs
            nome: '',
            email: '',
            nomeVaga: '',
            dataNascimento: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
    }

    //tutorial aqui: https://youtu.be/bE4q8Eg6DK0
    componentDidMount() {
        const { id } = this.state.id; //remover e setar apenas com o state nos parametros a frente --TODO--
        api.get('/' + id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    nome: response.data.nome,
                    email: response.data.email,
                    nomeVaga: response.data.nomeVaga,
                    dataNascimento: response.data.dataNascimento
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //setando estados das entradas do form
    changeHandler(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //Submetendo dados ao SERVER
    submitHandler = (e) => {
        //COLETANDO DADOS
        const { id } = this.state.id;
        //coletando dados do estado, jogando no objeto a ser enviado
        const nome = this.state.nome;
        const email = this.state.email;
        const nomeVaga = this.state.nomeVaga;
        const dataNascimento = this.state.dataNascimento;
        const user = {
            nome,
            email,
            nomeVaga,
            dataNascimento,
            id
        }

        api.put(`http://localhost:4000/usuarios/${this.state.id}`, user)
            .then(res => {
                this.setState({
                    //ainda nao exibe o alerta na tela
                    message: { text: 'Usuário editado com sucesso', alert: 'success' }
                })
                alert(this.state.message.text);
                //refresh da pagina
                //this.componentDidMount();
                //duração do alerta ao usuário
                //alert(this.state.message.text);
            })
            .catch((err) => {
                this.setState({
                    //Ajustar feedback ao usuário --TODO--
                    message: { text: 'Erro na edição do usuário', alert: 'danger' }
                })
                console.log(err);
            })
    }

    //Roteamento
    returnToMain = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                {
                    this.state.message.text !== '' ? (
                        <Alert color={this.state.message.alert}>{this.state.message.text}</Alert>
                    ) : ''
                }
                <div className="formulario">
                    <Form className="login-form form-horizontal" onSubmit={this.submitHandler}>
                        <h2 className="text-center">Edição de Usuário</h2>
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                placeholder="Nome"
                                name="nome"
                                value={this.state.nome}
                                // value={usuario.nome}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Vaga</Label>
                            <Input
                                type="text"
                                placeholder="ex: Front-End, Back-End"
                                name="nomeVaga"
                                value={this.state.nomeVaga}
                                // value={usuario.nomeVaga}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Data de Nascimento</Label>
                            <Input
                                type="date"
                                name="dataNascimento"
                                value={this.state.dataNascimento}
                                // value={usuario.dataNascimento}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="exemplo@email.com"
                                name="email"
                                value={this.state.email}
                                //value={nome}
                                onChange={this.changeHandler.bind(this)}
                            />
                        </FormGroup>
                        <Button
                            className="btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            Enviar
                        </Button>
                        <div className="text-center pt3"></div>
                    </Form>
                </div>
                <Button color="link" className="btn_voltar" onClick={(e) => this.returnToMain(e)}>VOLTAR</Button>
            </div>
        )
    }
}