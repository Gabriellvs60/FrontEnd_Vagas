import React, { Component } from 'react';
import './styles.css';

import { Button, Form, FormGroup, Label, Input, Alert }
    from 'reactstrap';

//axios
import api from '../../services/api';

export default class CadastroUsuario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //preparando os alertas sobre sucesso nas ações do usuário
            message: {
                text: '',
                alert: ''
            },
            nome: '',
            email: '',
            nomeVaga: '',
            dataNascimento: '',
            nomeErro: '',
            nomeVagaErro: '',
            dataNascimentoErro: '',
            emailErro: ''
        }
    }

    //setando estados nas entradas do form
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    validate = () => {
        let nomeErro = '';
        let nomeVagaErro = '';
        let dataNascimentoErro = '';
        let emailErro = '';

        if (!this.state.dataNascimento) {
            dataNascimentoErro = "Campo Data não pode ser vazio"
        }

        if (!this.state.nomeVaga) {
            nomeVagaErro = "Campo vaga não pode ser vazio"
        }

        if (!this.state.nome) {
            nomeErro = "Campo nome não pode ser vazio"
        }
        if (!this.state.email.includes("@")) {
            emailErro = "Email inválido"
        }

        if (emailErro || nomeErro || emailErro || dataNascimentoErro) {
            this.setState({ emailErro, nomeErro, nomeVagaErro, dataNascimentoErro });
            return false;
        }
        return true;
    }
    submitHandler = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (!isValid) {
            console.log(isValid)
        } else {
            //coletando dados do estado, jogando no objeto a ser enviado
            const nome = this.state.nome;
            const email = this.state.email;
            const nomeVaga = this.state.nomeVaga;
            const dataNascimento = this.state.dataNascimento;
            const data = {
                nome,
                email,
                nomeVaga,
                dataNascimento
            }
            //Salvando usuário criado
            api.post('http://localhost:4000/usuarios/', data)
                .then(res => {
                    this.setState({
                        message: { text: 'Usuário Adicionado com sucesso', alert: 'success' }
                    })
                    //refresh da pagina
                    //this.componentDidMount();
                    //duração do alerta ao usuário
                    alert(this.state.message.text);
                    this.returnToMain('/');
                    
                })
                .catch((err) => {
                    this.setState({
                        message: { text: 'Erro na inclusão do usuário', alert: 'danger' }
                    })
                    alert(this.state.message.text);
                    console.log(err);
                })
        }
    }

    returnToMain = () => {
        this.props.history.push('/');
    }

    refreshage(){
        this.props.history.replace("/cadastroUsuario");
    }
    //Not Working
    redirectToMain() {
        //props especial do react para as rotas
        this.props.history.push('/usuarios', this.state.message);
        //this.props.history.push('/usuarios/1')
    }

    //form com bootstrap
    //https://youtu.be/XHPL-rX9m-Q
    render() {
        const { nome, email, nomeVaga, dataNascimento, nomeErro, nomeVagaErro, emailErro, dataNascimentoErro } = this.state
        return (
            <div>
                <div className="formulario">
                    <Form className="login-form form-horizontal" onSubmit={this.submitHandler}>
                        <h2 className="text-center">Criar Usuário</h2>
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                placeholder="Nome"
                                name="nome"
                                value={nome}
                                onChange={this.changeHandler} />
                            {/*  VALIDAÇÃO */}
                            {this.state.nomeErro ? <div style={{ fontsize: 12, color: "red" }}>{this.state.nomeErro}</div> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Vaga</Label>
                            <Input
                                type="text"
                                placeholder="ex: Front-End, Back-End"
                                name="nomeVaga"
                                value={nomeVaga}
                                onChange={this.changeHandler} />
                            {this.state.nomeVagaErro ? <div style={{ fontsize: 12, color: "red" }}>{this.state.nomeVagaErro}</div> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Data de Nascimento</Label>
                            <Input
                                type="date"
                                name="dataNascimento"
                                value={dataNascimento}
                                onChange={this.changeHandler} />
                            {this.state.dataNascimentoErro ? <div style={{ fontsize: 12, color: "red" }}>{this.state.dataNascimentoErro}</div> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="exemplo@email.com"
                                name="email"
                                value={email}
                                onChange={this.changeHandler}
                            />
                            {this.state.emailErro ? <div style={{ fontsize: 12, color: "red" }} >{this.state.emailErro}</div> : null}
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


//POST PURO sem o Axios
    //coletando dados de form para preparar envio api
    //https://youtu.be/x9UEDRbLhJE
/*     submitHandler = e => {
      fetch('http://localhost:4000/usuarios', {
          method: 'POST',
          body: JSON.stringify({
            nome : this.state.nome,
            email : this.state.email,
            nomeVaga : this.state.nomeVaga,
            dataNascimento : this.state.dataNascimento
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => console.log(json))
    } */