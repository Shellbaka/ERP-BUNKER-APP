import { useState } from "react";
import { usePessoaApi, Pessoa } from "../Hooks/UsarApiBunker";

import React from "react";  

export default function AtualizaPessoa() {
  const [id, setId] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { atualizarPessoa } = usePessoaApi();

  async function atualizar() {
    setMensagem("");

    const payload: Pessoa = {
      cnpj,
      codigo,
      tipo,
    };

    try {
      await atualizarPessoa(id, payload);
      setMensagem("Pessoa atualizada com sucesso ✅");
    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 404) {
        setMensagem("Pessoa não encontrada");
      } else if (err.response?.status === 400) {
        setMensagem("Dados inválidos para atualização");
      } else {
        setMensagem("Erro ao atualizar pessoa");
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Atualizar Pessoa</h2>

      <input
        placeholder="ID da pessoa"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <br /><br />

      <button onClick={atualizar}>ATUALIZAR</button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
