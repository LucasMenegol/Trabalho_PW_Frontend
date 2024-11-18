export const getMarcasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`);
    const data = await response.json();
    return data;
};
export const getModelosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo`);
    const data = await response.json();
    return data;
};

export const getModeloPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo/${codigo}`);
    const data = await response.json();
    return data;
};

export const deleteModeloPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo/${codigo}`, { method: "DELETE" });
    const data = await response.json();
    return data;
};

export const cadastraModeloAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/modelo`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
};
