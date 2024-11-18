import { useContext } from "react";
import ModeloContext from "./ModeloContext";
import Alerta from "../../comuns/Alerta";
import { Table, Button } from "react-bootstrap";

function Tabela1() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ModeloContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Modelos</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={novoObjeto}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Marca</th> {/* Nova coluna para a marca associada */}
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.codigo)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.marca_nome || "Sem Marca"}</td> {/* Exibe o nome da marca */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela1;
