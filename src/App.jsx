
import React, { useState } from 'react';

function App() {

  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: 'Vitor Giacomini',
      servico: 'Passar',
      status: 'Pendente'
    },
    {
      id: 2,
      cliente: 'Gabriel Inácio',
      servico: 'Secagem',
      status: 'Em andamento...'
    }
  ]);

  const [novoPedido, setNovoPedido] = useState({
    cliente: '',
    servico: '',
    status: 'pendente'
  });

  const [pedidoEditando, setPedidoEditando] = useState(null);

  const adicionarPedido = () => {
    const novoId = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;
    const pedidoComId = { ...novoPedido, id: novoId };
    setPedidos([...pedidos, pedidoComId]);
    setNovoPedido({ cliente: '', servico: '', status: 'pendente' }); // Limpar formulário
  };

  const editarPedido = (id) => {
    const pedidoParaEditar = pedidos.find((pedido) => pedido.id === id);
    setPedidoEditando(pedidoParaEditar);
  };

  const salvarEdicao = () => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === pedidoEditando.id ? pedidoEditando : pedido
      )
    );
    setPedidoEditando(null);
  };
  const excluirPedido = (id) => {
    const pedidosFiltrados = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(pedidosFiltrados);
  };

  return (
    <div className="App">
      <h1>App de Lavanderia</h1>

      <h2>Adicionar Pedido</h2>
      <div>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={novoPedido.cliente}
          onChange={(e) =>
            setNovoPedido({ ...novoPedido, cliente: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Serviço"
          value={novoPedido.servico}
          onChange={(e) =>
            setNovoPedido({ ...novoPedido, servico: e.target.value })
          }
        />
        <button onClick={adicionarPedido}>Adicionar Pedido</button>
      </div>

      <h2>Lista de Pedidos</h2>
      <ul>
  {pedidos.map((pedido) => (
    <li key={pedido.id}>
      <div className="pedido-info">
        <span><strong>Cliente:</strong> {pedido.cliente}</span>
        <span><strong>Serviço:</strong> {pedido.servico}</span>
        <span><strong>Status:</strong> {pedido.status}</span>
      </div>
      <div>
        <button onClick={() => editarPedido(pedido.id)}className='editar'>Editar</button>
        <button onClick={() => excluirPedido(pedido.id)} className='excluir'>Excluir</button>
      </div>
    </li>
  ))}
</ul>


      {pedidoEditando && (
        <div>
          <h2>Editar Pedido</h2>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={pedidoEditando.cliente}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, cliente: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Serviço"
            value={pedidoEditando.servico}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, servico: e.target.value })
            }
          />
          <select
            value={pedidoEditando.status}
            onChange={(e) =>
              setPedidoEditando({ ...pedidoEditando, status: e.target.value })
            }
          >
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
          <button onClick={salvarEdicao}>Salvar</button>
        </div>
      )}
    </div>
  );
}

export default App;