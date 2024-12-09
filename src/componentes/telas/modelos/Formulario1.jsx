import { useContext, useState } from "react";
import ModeloContext from "./ModeloContext";
import Alerta from "../../comuns/Alerta";
import { Modal, Form, Button, FloatingLabel, Container, Row, Col } from "react-bootstrap";

function Formulario1() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaMarcas } = useContext(ModeloContext); 
    // listaMarcas contém as marcas disponíveis para o dropdown
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            acaoCadastrar(event);
        }
    };

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modelos</Modal.Title>
            </Modal.Header>
            <Form id="formulario" onSubmit={handleSubmit} noValidate validated={validated}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtCodigo" label="Código" className="mb-3">
                                    <Form.Control type="number" readOnly name="codigo" value={objeto.codigo} onChange={handleChange} />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtNome" label="Nome" className="mb-3">
                                    <Form.Control type="text" required name="nome" value={objeto.nome} onChange={handleChange} placeholder="Informe o nome" />
                                    <Form.Control.Feedback type="invalid">Informe o Nome</Form.Control.Feedback>
                                    <Form.Control.Feedback>Campo Nome OK</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="selectMarca" label="Marca" className="mb-3">
                                    <Form.Select
                                        required
                                        name="marca_id"
                                        value={objeto.marca_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione uma Marca</option>
                                        {listaMarcas.map((marca) => (
                                            <option key={marca.codigo} value={marca.codigo}>
                                                {marca.nome}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Selecione uma Marca</Form.Control.Feedback>
                                    <Form.Control.Feedback>Campo Marca OK</Form.Control.Feedback>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>Fechar</Button>
                    <Button variant="success" type="submit">Salvar <i className="bi bi-save"></i></Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Formulario1;
