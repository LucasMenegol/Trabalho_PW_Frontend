import { useState, useEffect } from "react";
import ModeloContext from "./ModeloContext";
import {
    getModelosAPI, getModeloPorCodigoAPI, deleteModeloPorCodigoAPI,
    cadastraModeloAPI, getMarcasAPI
} from "../../../servicos/ModeloServico";
import Tabela from "./Tabela1";
import Formulario from "./Formulario1";
import Carregando from "../../comuns/Carregando";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function Modelos() {
    let navigate = useNavigate();
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaMarcas, setListaMarcas] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "", marcaId: "" });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        try {
            setEditar(false);
            setAlerta({ status: "", message: "" });
            setObjeto({ codigo: 0, nome: "", marcaId: "" });
            setExibirForm(true);
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
                navigate("/login", { replace: true });
    };
}

    /*const handleMarcaChange = (e) => {
        const selectedMarcaId = e.target.value;
        setModelo({ ...modelo, marca_id: selectedMarcaId });
      };*/
      

    const editarObjeto = async (codigo) => {
        setObjeto(await getModeloPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraModeloAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            console.log("Erro: " + err);
        }
        recuperaModelos();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const recuperaModelos = async () => {
        setCarregando(true);
        setListaObjetos(await getModelosAPI());
        setCarregando(false);
    };

    const recuperaMarcas = async () => {
        setListaMarcas(await getMarcasAPI());
    };

    const remover = async (codigo) => {
        if (window.confirm("Deseja remover este objeto?")) {
            let retornoAPI = await deleteModeloPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaModelos();
        }
    };

    useEffect(() => {
        recuperaModelos();
        recuperaMarcas();
    }, []);

    return (
        <ModeloContext.Provider value={{
            alerta, listaObjetos, listaMarcas, remover, objeto, editarObjeto,
            novoObjeto, acaoCadastrar, handleChange, exibirForm, setExibirForm
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </ModeloContext.Provider>
    );
}

export default WithAuth(Modelos); 
