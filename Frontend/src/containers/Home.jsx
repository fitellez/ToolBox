import React, { Component } from 'react';
import '../assets/styles/Menu.scss';
import axios from 'axios';
import $ from 'jquery';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: '',
            mensajeOriginal: [],
            mensajes: [],
            error:'',
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
      $('#successAlert').hide();
      $('#dangerAlert').hide();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSendMessage(e) {
        e.preventDefault();
        const { mensaje, mensajes, mensajeOriginal } = this.state;
        if (mensaje.trim() != 0) {
            try {
                axios({
                    method: 'GET',
                    url: `${process.env.api}/text/${mensaje}`
                })
                    .then((response) => {
                        mensajeOriginal.push(mensaje);
                        mensajes.push(response.data);
                        if(response.data.palindrome){
                          $('#successAlert').show();
                          this.setState({error: 'Palindromo'});
                          setTimeout(() => {
                            $('#successAlert').hide(); 
                          }, 1500);
                        }
                        this.setState({ mensaje: '' });
                        $('#mensaje').val('');
                    })
                    .catch((error) => {
                        this.setState({error: error.response.data.text})
                        if (error.response.status == 400) {
                          $('#dangerAlert').show();
                          setTimeout(() => {
                            $('#dangerAlert').hide(); 
                          }, 1500);
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
          $('#dangerAlert').show();
          this.setState({error: 'Debes enviar un texto'});
          setTimeout(() => {
            $('#dangerAlert').hide();
          }, 1500);
        }
    }

    render() {
        const { mensajes, mensajeOriginal, error } = this.state;
        return (
            <>
                <div className='mx-4 mx-lg-5' style={{ height: '100vh' }}>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='alert alert-danger hideAlert' id='dangerAlert' role='alert'>
                                {error}
                            </div>
                            <div className='alert alert-success hideAlert' id='successAlert' role='alert'>
                                {error}
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-12 col-md-6 offset-0 offset-md-3 Menu-BgColor mt-5'>
                            <h4 className='my-3'>Enviar Mensaje</h4>
                            <form onSubmit={(e) => this.onSendMessage(e)}>
                                <div className='form-row'>
                                    <div className='form-group col-md-9'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='mensaje'
                                            id='mensaje'
                                            maxLength='50'
                                            placeholder='Mensaje'
                                            required
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                    <div className='col-3 text-right'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary text-white font-weight-bold px-2 px-lg-5'
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className='col-12 Menu-BgColor'>
                            <h4 className='my-3'>Mensajes enviados</h4>
                            <div className='table-responsive'>
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th>Número</th>
                                            <th>Mensaje original</th>
                                            <th>Mensaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mensajes.map((item, i) => {
                                            return (
                                                <tr key={i} className='text-center'>
                                                    <td>{i + 1}</td>
                                                    <td>{mensajeOriginal[i]}</td>
                                                    <td>{item.text}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
