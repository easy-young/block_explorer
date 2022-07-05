// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Block from './pages/Block';
import Tx from './pages/Tx';

import Blocks from './pages/more/Blocks';
import Txs from './pages/more/Txs';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Index />} />
                <Route path="/block/:idx" element={<Block />} />
                <Route path="/tx/:idx" element={<Tx />} />
                <Route path="/more/block" element={<Blocks />} />
                <Route path="/more/tx" element={<Txs />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
