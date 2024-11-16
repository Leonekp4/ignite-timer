import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<History />} />
            </Route>
        </Routes>

    );
}



        // Para adicionar uma rota que não está dentro de um layout, basta adicionar um novo Route: Nesse caso uma rota Admin
        // <Routes>
        //     <Route path='/admin' element={<AdminLayout />}>
        //         <Route path='/products' element={<Home />} />
        //         <Route path='/history' element={<History />} />
        //     </Route>
        // </Routes>
        // http://localhost:30000/adimin/products