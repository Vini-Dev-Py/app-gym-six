import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ButtonHome from "../../components/ButtonHome/ButtonHome";
import Loading from "../../components/Loading/Loading";
import { getUser } from "../../services/getUser";
import { updatePassword } from "../../services/updatePassword";
import "./Profile.css";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    async function getUserLocal() {
        const response = await getUser();

        setUser(JSON.parse(response));
    }

    async function handleUpdatePassword() {

        const passwordOBJ = {
            password: password,
            newPassword: newPassword
        }

        const response = await updatePassword(passwordOBJ);

        setShowModal(false);
    }

    useEffect(() => {
        getUserLocal();
    }, [])

    if (!user) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <main className="container">
            <header className="header">
                <h2>
                    Meu perfil
                </h2>
                <ButtonHome />
            </header>
            <section>
                {
                    <table id="aluno">
                        <tbody>
                            <tr>
                                <td>Nome:</td>
                                <td>{user.name}</td>
                                <td>
                                    <button onClick={null} disabled>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={null} disabled>
                                        Verificar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </section>
            <section>
                <button className="change-password-button" onClick={() => setShowModal(true)}>Alterar senha</button>
            </section>
            {showModal && (
                <div className="password-modal">
                    <div className="modal-content">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Nova Senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={() => handleUpdatePassword()}>Confirmar</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </main>
    )
}