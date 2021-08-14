import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    //state lista de criptos
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'ARS', nombre: 'Peso Argentino' }
    ]

    //Utiliza use Moneda
    const [moneda, SelectMonedas] = useMoneda('Selecciona tu Moneda', '', MONEDAS);

    //Utiliza useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Llama a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get();

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //cuando hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar campos llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //pasar los datos al componente principal
        guardarError(false);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? 'Hay un error' : null}

            <SelectMonedas />

            <SelectCripto />

            <Boton 
            type="submit"
            value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;