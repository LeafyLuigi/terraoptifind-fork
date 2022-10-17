// take in name of one npc, biome, and neighbours (list of names of npcs)
// return happiness of the one npc (pricing modifier) multiplied by the npc's weight
function oneHappiness(name, biome, neighbours) {
  let happ = 1.0
  let npc = npcs[name]
  
  
  if (name === "Princess") {
      if (neighbours.length < 2) { return 1.5 * npc["weighting"] }
      happ *= Math.pow(0.88, Math.min(3, neighbours.length))
      return +(Math.max(happ, 0.75)).toFixed(2)
  }
  
  
  // crowdedness
  if (neighbours.length > 3) {
    happ *= 1.05 ** (neighbours.length - 3)
  } else if (neighbours.length < 3) {
    happ *= 0.95
  }

  // loved biomes only apply to santa in vanilla
  if (biome.includes(npc["biomes_loved"])) {
    happ *= 0.88
  }

  // right biome
  if (biome.includes(npc["biomes_liked"])) {
    happ *= 0.94
  }

  // wrong biome
  if (biome.includes(npc["biomes_disliked"])) {
    happ *= 1.06
  }

  // hated biomes only apply to santa in vanilla
  else if (biome.includes(npc["biomes_hated"])) {
    happ *= 1.12
  }

  // neighbours
  for (const n of neighbours) {
    if (npc["loves"].includes(n))                     { happ *= 0.88 }
    if (npc["likes"].includes(n) || n === "Princess") { happ *= 0.94 }
    if (npc["dislikes"].includes(n))                  { happ *= 1.06 }
    if (npc["hates"].includes(n))                     { happ *= 1.12 }
  }

  // enforce upper/lower bound on happiness
  happ = Math.min(1.5, happ)
  happ = Math.max(0.75, happ)

  // round to 2dp
  // weighting is how much we care about that npc
  return +happ.toFixed(2) * npc["weighting"]
}


function sumOfWeights(group) {
  let totalWeight = 0
  for (const person of group) {
    totalWeight += npcdict[person]["weighting"]
  }
  return totalWeight
}

// input group of names of npcs
// return array of the biome(s) which minimise happiness
function bestBiomesForGroup(group) {
  let lowestHappinessSoFar = Infinity
  let bestBiomesSoFar = []
  for (const biome of biomesTotal) {
    if (group.includes("Truffle") && (!biome.includes("Mushroom") || biome.includes("Caverns"))) { continue }
    let thisBiomeHappiness = 0.0
    for (const person of group) {
      thisBiomeHappiness += oneHappiness(person, biome,
        group.filter((name,index) => name !== person))
    }
    thisBiomeHappiness = +thisBiomeHappiness.toFixed(8)
    if (thisBiomeHappiness < lowestHappinessSoFar) {
      bestBiomesSoFar = [biome]
      lowestHappinessSoFar = thisBiomeHappiness
    } else if (thisBiomeHappiness === lowestHappinessSoFar) {
      bestBiomesSoFar.push(biome)
    }
  }  
  return bestBiomesSoFar
}

// input group of names of npcs
function groupHappWeightBiomes(group) {
  let bestBiomes = bestBiomesForGroup(group)
  let thisGroupHappiness = 0.0
  
  for (const person of group) {
    thisGroupHappiness += oneHappiness(person, bestBiomes[0],
      group.filter((name,index) => name !== person))
  }

  return [thisGroupHappiness / sumOfWeights(group), sumOfWeights(group), bestBiomes]
}
