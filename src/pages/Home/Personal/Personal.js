import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { getUsersByPersonal } from '../../../services/getUsersByPersonal';

import "./Personal.css";

export default function Personal({ user }) {

    const [responsePersonal, setResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUsersByPersonal(user.id);

            setResponse(response.data["data"]);
        }

        fetchData();
    }, [])

    async function handlerCriarAluno() {
        navigate("/criar/aluno");
    }

    async function handlerCriarTemplate() {

    }

    async function handlerListarTemplates() {

    }

    if (!responsePersonal) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <main>
            <div>
                <h2>Bem vindo {user.name}</h2>
            </div>
            <section id="tabela-conteudo">
                <div className="tabela">
                    <table id="alunos">
                        <thead>
                            <tr className="index-table">
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                responsePersonal.map((userMap) => (
                                    <tr className="value-table" key={userMap.user.id}>
                                        <td>
                                            {userMap.user.name}
                                        </td>
                                        <td>
                                            {userMap.user.email}
                                        </td>
                                        <td>
                                            {userMap.user.phone}
                                        </td>
                                        <td>
                                            {
                                                userMap.user.active ? "Ativo" : "Desativado"
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/aluno/detalhes/${userMap.user.id}`}>Detalhes</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="conteudo">
                    <section className="cards">
                        <div className="card">
                            <div>
                                <p className="title">Total de alunos: {responsePersonal.length}</p>
                            </div>
                            <div>
                                <button className="criar-aluno" onClick={handlerCriarAluno}>
                                    Criar aluno
                                </button>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <p className="title">
                                    Template treinos
                                </p>
                            </div>
                            <div>
                                <button className="criar-template-treino" onClick={handlerCriarTemplate} disabled>
                                    Criar template
                                </button>
                                <button className="listar-template-treino" onClick={handlerListarTemplates} disabled>
                                    Listar templates
                                </button>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <p className="title">Configurações</p>
                            </div>
                            <div>
                                <button className="" onClick={null} disabled>
                                    Meu perfil
                                </button>
                                <button className="" onClick={null} disabled>
                                    Meu Plano
                                </button>
                                <button className="" onClick={null} disabled>
                                    Pagamentos
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    )
}