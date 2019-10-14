import React, { Component } from 'react';
import "./styles.css";

import api from '../../services/api';

import Loader from '../../components/loader';

import { Table, Button, Form, FormGroup, Label, Row, Alert }
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
            //preparando os alertas sobre sucesso nas ações do usuário
            message: {
                text: '',
                alert: ''
            }
        }
    }

    //chamada json sem axios , puro 
    // --todo-- tornar rota universal
    componentDidMount() {
        let url = "http://localhost:4000/usuarios"
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
                this.forceUpdate();
            });
    }

    //determina o texto e duração da mensagem...
    timerMessage(duration) {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: '' } });
        }, duration);
    }

    //carrega view para ver detalhes do usuario
    viewItem = id => {
        this.props.history.push('/usuarios/' + id);
    }

    //chama o cadastro do usuario
    handleClick = () => {
        //props especial do react para as rotas
        this.props.history.push('/cadastroUsuario');
    }

    //chama a tela de edição do usuario
    updateItem = id => {
        this.props.history.push('/editaUsuario/' + id)
    }

    //deletando item
    deleteItem = id => {
        let confirmDelete = window.confirm('Deseja Realmente deletar o item')
        if (confirmDelete == true) {
            api.delete('http://localhost:4000/usuarios/' + id)
                .then(res => {
                    this.setState({
                        message: { text: 'Usuário excluido com sucesso', alert: 'success' }
                    })
                    //refresh da pagina
                    this.componentDidMount();
                    //duração do alerta ao usuário
                    this.timerMessage(9000);
                })
                .catch((err) => {
                    this.setState({
                        message: { text: 'Erro na exclusão do usuário', alert: 'danger' }
                    })
                    this.timerMessage(9000);
                })
        } else {
            //--todo--
        }
    }



    render() {
        var { isLoaded, items, id } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <div>Carregando...</div>
                    <Loader />
                </div>
            )
        }
        else {
            return (
                <div className="main">
                    {
                        this.state.message.text !== '' ? (
                            <Alert color={this.state.message.alert}>{this.state.message.text}</Alert>
                        ) : ''
                    }
                    {/* CRIAR */}
                    <div className="btnCriar">
                        <div className="d-flex align-items-center">
                            <span className="lb_users">
                                Usuários
                        </span>
                            <button type="button" className="btn btn-secondary ml-auto" onClick={(e) => this.handleClick(e)}>CRIAR</button>
                        </div>
                    </div>
                    {/* tabela */}
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
                                    <td className="tdAction" onClick={() => this.viewItem(item.id)}>{item.id}</td>
                                    <td className="tdAction" onClick={() => this.viewItem(item.id)}>{item.nome}</td>
                                    <td className="tdAction" onClick={() => this.viewItem(item.id)}>{item.nomeVaga}</td>
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

//delete sem axios
/*   deleteItem = id => {
      let confirmDelete = window.confirm('Deseja Realmente deletar o item')
      if (confirmDelete) {
          fetch('http://localhost:4000/usuarios/' + id, {
              method: 'delete',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
      })
          .then((response) => response.json())
          .then((responseJson) => {
          //this.setState({text: responseJson.success, alert:});  //***** put the result -> state
          alert(JSON.stringify(responseJson));
          console.log(responseJson)
           })
           }
} */