import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Alerta = ({ alerta }) => {
    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        if (alerta && alerta.message) {
            setExibir(true);
            setTimeout(() => {
                setExibir(false);
            }, 2000);
        }
    }, [alerta]);

    return (
        <>
            {exibir && alerta?.message?.length > 0 && (
                <Alert variant={alerta.status === 'error' ? 'danger' : 'primary'}>
                    {alerta.message}
                </Alert>
            )}
        </>
    );
};

export default Alerta;
