// src/CadCliente.tsx

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Inputs = {
    nome: string;
    email: string;
    cidade: string;
    senha: string;
    senha2: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function CadCliente() {
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const navigate = useNavigate();

    async function cadastraCliente(data: Inputs) {
        if (data.senha !== data.senha2) {
            toast.error("Erro: Senha e Confirmação de Senha não são iguais.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/clientes`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    cidade: data.cidade,
                    email: data.email,
                    senha: data.senha
                })
            });

            if (response.status === 201) {
                toast.success("Cadastro realizado com sucesso! Faça seu login.");
                reset();
                navigate("/login");
            } else {
                const erro = await response.json();
                toast.error(`Erro: ${erro.erro || 'Não foi possível realizar o cadastro.'}`);
            }
        } catch (error) {
            toast.error("Erro de conexão. Tente novamente mais tarde.");
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-100 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Crie sua Conta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(cadastraCliente)}>
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Seu nome completo:</label>
                                <input type="text" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome Completo" required {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">E-mail:</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sua cidade:</label>
                                <input type="text" id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cidade" required {...register("cidade")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Senha de Acesso:</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirme a Senha:</label>
                                <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register("senha2")} />
                            </div>
                            <button type="submit" className="w-full bg-black text-white border border-black hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-5">
                                Criar Conta
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Já possui uma conta? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Faça Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}