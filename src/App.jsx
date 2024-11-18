import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/telas/Home';
import Sobre from './componentes/telas/Sobre';

// Importando os Providers dos Contextos
import { ModeloProvider } from './componentes/telas/modelos/ModeloContext';

// Importando as páginas de Marcas e Modelos
import Marcas from './componentes/telas/marcas/Marcas';
import Modelos from './componentes/telas/modelos/Modelos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/sobre",
        element: <Sobre />
      },
      {
        path: "/marcas",
        element: 
          
            <Marcas />
          
         // Envolvendo a página Marcas com o MarcaProvider
      },
      {
        path: "/modelos",
        element: (
          <ModeloProvider>
            <Modelos />
          </ModeloProvider>
        ) // Envolvendo a página Modelos com o ModeloProvider
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
