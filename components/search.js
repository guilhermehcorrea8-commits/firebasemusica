export function buscar(lista, termo) {
  return lista.filter(m =>
    m.nome.toLowerCase().includes(termo.toLowerCase())
  );
}