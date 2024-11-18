export const getMarcasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`);
    const data = await response.json();
    return data;
};

export const getMarcaPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca/${codigo}`);
    const data = await response.json();
    return data;
};

export const deleteMarcaPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca/${codigo}`, { method: "DELETE" });
    const data = await response.json();
    return data;
};

export const cadastraMarcaAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/marca`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
};
