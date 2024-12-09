import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Criando o contexto para o Modelo
const ModeloContext = createContext();

// Criando o Provider para o ModeloContext
export const ModeloProvider = ({ children }) => {
  // Estado para armazenar os modelos
  const [listaObjetos, setListaObjetos] = useState([]);
  // Estado para armazenar as marcas (para o dropdown no formulário de modelo)
  const [listaMarcas, setListaMarcas] = useState([]);
  // Estado para o alerta de mensagens de erro ou sucesso
  const [alerta, setAlerta] = useState("");
  // Estado para controlar a visibilidade do formulário de edição/criação
  const [exibirForm, setExibirForm] = useState(false);
  // Estado para armazenar o objeto do modelo no formulário (usado para edição/criação)
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    marca: { codigo: "", nome: "" }
  });

  // Carregar os modelos e as marcas ao montar o componente
  useEffect(() => {
    // Carregar lista de modelos
    axios
      .get("http://localhost:3002/api/modelos")
      .then((response) => setListaObjetos(response.data))
      .catch(() => setAlerta("Erro ao carregar os modelos"));

    // Carregar lista de marcas
    axios
      .get("http://localhost:3002/api/marcas")
      .then((response) => setListaMarcas(response.data))
      .catch(() => setAlerta("Erro ao carregar as marcas"));
  }, []);

  // Função para editar um modelo
  const editarObjeto = (codigo) => {
    const modeloEditado = listaObjetos.find((obj) => obj.codigo === codigo);
    setObjeto(modeloEditado);
    setExibirForm(true);
  };

  // Função para remover um modelo
  const remover = (codigo) => {
    axios
      .delete(`http://localhost:3002/api/modelos/${codigo}`)
      .then(() => {
        setListaObjetos(listaObjetos.filter((obj) => obj.codigo !== codigo));
        setAlerta("Modelo removido com sucesso!");
      })
      .catch(() => setAlerta("Erro ao remover o modelo"));
  };

  // Função para cadastrar um novo modelo ou editar um existente
  const acaoCadastrar = (event) => {
    event.preventDefault();
    const { nome, marca } = objeto;

    const modeloData = {
      nome,
      marca: { codigo: marca.codigo }
    };

    if (objeto.codigo) {
      // Atualizar um modelo existente
      axios
        .put(`http://localhost:3002/api/modelos/${objeto.codigo}`, modeloData)
        .then(() => {
          setListaObjetos(
            listaObjetos.map((obj) =>
              obj.codigo === objeto.codigo ? { ...obj, ...modeloData } : obj
            )
          );
          setAlerta("Modelo atualizado com sucesso!");
          setExibirForm(false);
        })
        .catch(() => setAlerta("Erro ao atualizar o modelo"));
    } else {
      // Criar um novo modelo
      axios
        .post("http://localhost:3002/api/modelos", modeloData)
        .then((response) => {
          setListaObjetos([...listaObjetos, response.data]);
          setAlerta("Modelo criado com sucesso!");
          setExibirForm(false);
        })
        .catch(() => setAlerta("Erro ao criar o modelo"));
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setObjeto({
      ...objeto,
      [name]: name === "marca" ? { codigo: value } : value
    });
  };

  return (
    <ModeloContext.Provider
      value={{
        alerta,
        listaObjetos,
        listaMarcas,
        objeto,
        exibirForm,
        setExibirForm,
        editarObjeto,
        remover,
        acaoCadastrar,
        handleChange
      }}
    >
      {children}
    </ModeloContext.Provider>
  );
};

export default ModeloContext;
