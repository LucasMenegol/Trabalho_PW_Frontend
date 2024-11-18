import { useState, useEffect } from "react";
import MarcaContext from "./MarcaContext";
import { getMarcasAPI, getMarcaPorCodigoAPI, deleteMarcaPorCodigoAPI, cadastraMarcaAPI } from "../../../servicos/MarcaServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";

function Marcas() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);

    // Função para carregar as marcas
    const recuperaMarcas = async () => {
        setCarregando(true);
        const marcas = await getMarcasAPI();
        setListaObjetos(marcas);
        setCarregando(false);
    };

    // Função para adicionar uma nova marca
    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: 0, nome: "" });
        setExibirForm(true);
    };

    // Função para editar uma marca
    const editarObjeto = async (codigo) => {
        setObjeto(await getMarcaPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    // Função para cadastrar ou editar marca
    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraMarcaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
            recuperaMarcas();
        } catch (err) {
            console.log("Erro: " + err);
        }
    };

    // Função para remover uma marca
    const remover = async (codigo) => {
        if (window.confirm("Deseja remover esta marca?")) {
            let retornoAPI = await deleteMarcaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaMarcas();
        }
    };

    // Função para atualizar o estado do objeto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    useEffect(() => {
        recuperaMarcas();
    }, []);

    return (
        <MarcaContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            novoObjeto, acaoCadastrar, handleChange, exibirForm, setExibirForm
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </MarcaContext.Provider>
    );
}

export default Marcas;
