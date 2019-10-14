import React, {Component} from 'react';
import './styles.css';

import {Button, Form, FormGroup, Label, Input}
from'reactstrap';

export default class CadastroUsuario extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            id : '',
            nome : '',
            email : '',
            nomeVaga : '',
            dataNascimento : ''
        }
      }

      changeHandler = (e) => {
          this.setState({[e.target.name]: e.target.value})
      }
      //coletando dados de form para preparar envio api
      //https://youtu.be/x9UEDRbLhJE
      submitHandler = e => {
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
      }
      //form com bootstrap
      //https://youtu.be/XHPL-rX9m-Q
    render(){  
        const {nome,email,nomeVaga,dataNascimento} = this.state   
        return (
        <Form className="login-form form-horizontal" onSubmit={this.submitHandler}>
            <h2 className="text-center">Criar Usuário</h2>
            <FormGroup>
                <Label>Nome</Label>
                <Input 
                type="text" 
                placeholder="Nome"
                name="nome"
                value={nome}
                onChange={this.changeHandler}/>
            </FormGroup>
            <FormGroup>
                <Label>Vaga</Label>
                <Input 
                type="text" 
                placeholder="ex: Front-End, Back-End"
                name="nomeVaga"
                value={nomeVaga}
                onChange={this.changeHandler}/>
            </FormGroup>
            <FormGroup>
                <Label>Data de Nascimento</Label>
                <Input 
                type="date"
                name="dataNascimento"
                value={dataNascimento}
                onChange={this.changeHandler}
                />
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
            </FormGroup>
            <Button 
            className="btn-lg btn-dark btn-block"
            type="submit"
            >
                Enviar
            </Button>
            <div className="text-center pt3"></div>
        </Form>
        )
    }
}