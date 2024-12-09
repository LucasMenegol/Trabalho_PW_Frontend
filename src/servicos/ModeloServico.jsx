import { getToken } from '../seguranca/Autenticacao';

export const getModeloServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/modelo`,
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};
export const getModelosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const getModeloPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo/${codigo}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const deleteModeloPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo/${codigo}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
};

export const cadastraModeloAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
                "authorization": getToken()},
        body: JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
};
