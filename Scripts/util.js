function resolverTorneo(torneo) {
  let grupo = torneo.split("--");
  let pos = calcularRespuesta(grupo);
  return pos;
}

function calcularRespuesta(grupo){
  let cal = " " + grupo[0] + "\n";
  let paises = {}
  grupo[1].split(',').forEach(element => {
    paises[element.trim()] = {
      puntos: 0,
      jugados: 0,
      ganados: 0,
      empatados: 0,
      perdidos: 0,
      gf: 0,
      gc: 0
    };
  });
  let partidos = grupo[2].split(',');
  partidos.forEach(element => {
    let [local, golLocal, golVisita, visita] = element.split('#').map(x => x.trim());
    paises[local].jugados++;
    paises[visita].jugados++;
    paises[local].gf += parseInt(golLocal);
    paises[visita].gf += parseInt(golVisita);
    paises[local].gc += parseInt(golVisita);
    paises[visita].gc += parseInt(golLocal);
    if (golLocal > golVisita) {
      paises[local].puntos += 3;
      paises[local].ganados++;
      paises[visita].perdidos++;
    } else if (golLocal < golVisita) {
      paises[visita].puntos += 3;
      paises[visita].ganados++;
      paises[local].perdidos++;
    } else {
      paises[local].puntos += 1;
      paises[visita].puntos += 1;
      paises[local].empatados++;
      paises[visita].empatados++;
    }
  });
  let listaPaises = Object.keys(paises).sort((a, b) => {
    if (paises[b].puntos !== paises[a].puntos) {
      return paises[b].puntos - paises[a].puntos;
    } else if ((paises[b].gf - paises[b].gc) !== (paises[a].gf - paises[a].gc)) {
      return (paises[b].gf - paises[b].gc) - (paises[a].gf - paises[a].gc);
    } else {
      return paises[b].gf - paises[a].gf;
    }
  });
  cal += listaPaises.map((pais, index) => {
    let difGoles = paises[pais].gf - paises[pais].gc;
    return `${index+1}) ${pais} ${paises[pais].puntos}p, ${paises[pais].jugados}g (${paises[pais].ganados}-${paises[pais].empatados}-${paises[pais].perdidos}), ${difGoles}gd (${paises[pais].gf}-${paises[pais].gc})`;
  }).join('\n');
  return cal;
}

export {resolverTorneo}







