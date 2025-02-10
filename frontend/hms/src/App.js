import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { adminRoutes, publicRoutes, staffRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Login } from './pages';

function App() {
    const authState = useSelector((state) => state.auth);

    const [routesUser, setRoutesUser] = useState([]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            if (authState.role === 'admin') {
                setRoutesUser(adminRoutes);
            } else if (authState.role === 'staff') {
                setRoutesUser(staffRoutes);
            }
        } else {
            setRoutesUser(publicRoutes);
        }
    }, [authState.isAuthenticated, authState.role]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {authState.isAuthenticated ? (
                        routesUser.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
