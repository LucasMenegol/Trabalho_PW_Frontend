import { getToken } from '../seguranca/Autenticacao';

export const getMarcaServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/marcas`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getMarcasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const getMarcaPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca/${codigo}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const deleteMarcaPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca/${codigo}`, 
    {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const cadastraMarcaAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
        "authorization": getToken() },
        body: JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
};
