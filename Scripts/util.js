function resolverTorneo(torneo) {
  let grupo = torneo.split("--");
  let pos = calcularRespuesta(grupo);
  return pos;
}

function calcularRespuesta(grupo){
  let cal = "World Cup 1998 - " + grupo[0] + "\n";
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
    let [local, golLocal, golVisita, visita] = element.split('#');
    paises[local.trim()].jugados++;
    paises[visita.trim()].jugados++;
    paises[local.trim()].gf += parseInt(golLocal);
    paises[visita.trim()].gf += parseInt(golVisita);
    paises[local.trim()].gc += parseInt(golVisita);
    paises[visita.trim()].gc += parseInt(golLocal);
    if (golLocal > golVisita) {
      paises[local.trim()].puntos += 3;
      paises[local.trim()].ganados++;
      paises[visita.trim()].perdidos++;
    } else if (golLocal < golVisita) {
      paises[visita.trim()].puntos += 3;
      paises[visita.trim()].ganados++;
      paises[local.trim()].perdidos++;
    } else {
      paises[local.trim()].puntos += 1;
      paises[visita.trim()].puntos += 1;
      paises[local.trim()].empatados++;
      paises[visita.trim()].empatados++;
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







