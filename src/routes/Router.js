import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import MembersCreate from '../pages/Members/MembersCreate/MembersCreate';
import MembersDetails from '../pages/Members/MembersDetails/MembersDetails';
import Training from '../pages/Training/Training';
import CreateTraining from '../pages/Training/CreateTraining/CreateTraining';
import UpdateTraining from '../pages/Training/UpdateTraining/UpdateTraining';
import MemberTraining from '../pages/Training/MemberTraining/MemberTraining';
import Profile from '../pages/Profile/Profile';

export default function Router() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login onLoginSuccess={handleLoginSuccess} />}
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/criar/aluno"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <MembersCreate />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/aluno/detalhes/:id"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <MembersDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/aluno/:id/treino/:day/"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Training/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/aluno/:id/treino/:day/criar"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <CreateTraining/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/aluno/:id/treino/:day/editar/:id_training"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <UpdateTraining/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/treino/:day"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <MemberTraining />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
