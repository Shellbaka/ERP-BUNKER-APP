import { useState } from "react";
import api from "../Services/api";

export interface Pessoa {
  cnpj: number|string;
  codigo: string;
  tipo: number|string;
}

export function usePessoaApi() {
  const [data, setData] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function atualizarPessoa(id: string, dados: Pessoa) {
      const response = await api.put(`/pessoa/${id}`, dados);
      return response.data;
    }
    
  async function buscarPessoaPorId(id: number | string) {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<Pessoa>(`/pessoa/${id}`);
      setData(response.data);

    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao buscar pessoa");
      }

    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    buscarPessoaPorId,
    atualizarPessoa
  };
}
