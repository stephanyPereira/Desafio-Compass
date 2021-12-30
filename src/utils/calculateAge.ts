/* eslint-disable @typescript-eslint/no-explicit-any */
function calcularIdade(data: any) {
  const diffMs = Date.now() - new Date(data).getTime();
  const ageDt = new Date(diffMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

export default calcularIdade;
