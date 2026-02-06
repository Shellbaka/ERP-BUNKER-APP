import { useState } from "react";
import api from "../Services/api";

interface Pessoa {
  cnpj: number;
  codigo: string;
  empresa: number;
}

export function usePessoaApi() {
  const [data, setData] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function buscarPessoaPorId(id: number) {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<Pessoa>(`/pessoas/${id}`);
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
  };
}
