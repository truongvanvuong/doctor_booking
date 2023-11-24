import { useState, useEffect } from 'react';
import { Header, Footer, BackTop } from '../components';
import Routers from '../routes/Routers';
const Layout = () => {
    const [visible, setvisible] = useState(false);
    const handleShowBacktop = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100 || document.body.scrollTop > 100) {
                setvisible(true);
            } else {
                setvisible(false);
            }
        });
    };
    useEffect(() => {
        handleShowBacktop();
        return () => {
            window.removeEventListener('scroll', handleShowBacktop);
        };
    }, []);
    return (
        <div>
            <Header />
            <main>
                <Routers />
            </main>
            <Footer />
            {visible && <BackTop />}
        </div>
    );
};

export default Layout;
