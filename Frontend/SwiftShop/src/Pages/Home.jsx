import { Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AddItem } from './AddItem';
import { Shop } from './Shop';
import { DashBoard } from './DashBoard';
export const Home = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/shop" element={<Shop />} />

            </Routes>
            <Footer />
        </>
    )
}

