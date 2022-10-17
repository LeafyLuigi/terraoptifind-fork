var showModdedSheet = "tr[modded]{display:table-row}div[modded]{display:block}"
var moddedVisible = false
function toggleModded() {
  if (!moddedVisible){
    var sheet = document.createElement("style")
    sheet.setAttribute("id","showModdedStyleSheet")
    sheet.innerText = showModdedSheet
    document.head.appendChild(sheet)
    moddedVisible = true
  }
  else {
    document.getElementById("showModdedStyleSheet").remove()
    moddedVisible = false
  }
}

function updateNumPossibleGroups() {
  // count number of npcs we can use
  let n = 0
  for (const person of npcs) {
    if (document.getElementById(person + "Checkbox").checked) {
      n += 1
    }
  }

  let minGroupSize = document.getElementById("minGroupSize").value
  let maxGroupSize = document.getElementById("maxGroupSize").value


  // build pascal's triangle so we can do n choose k
  
  let pascals = [[1]]
  for (let i = 1; i <= n; i++) {
    // add ith row
    let newRow = [1]
    for (let j = 1; j < i; j++) {
      newRow.push(pascals[i-1][j-1] + pascals[i-1][j])
    }
    newRow.push(1)
    pascals.push(newRow)
  }

  numOfPeopleInGroups = 0
  let numOfGroups = 0
  for (let k = minGroupSize; k <= maxGroupSize; k++) {
    // add n choose k for every k
    numOfGroups += pascals[n][k]
    numOfPeopleInGroups += pascals[n][k] * k
  }
  document.getElementById("numPossibleGroups").value = numOfGroups
}

function genBiomeTable() {
  let tableHTML = "<table>"
  tableHTML += "<tr> <th>Biome</th> <th>Biome Exists?</th>"
  for (const biome of biomesTotal) {
    tableHTML += "<tr"
    // Adds mod id for selection via buttons and whatnot
    if (Object.keys(biomes1Modded).includes(biome)) {
      tableHTML += " fromMod=\"" + biomes1Modded[biome]["mod"] + "\""
      if(biomes1Modded[biome]["note"]){tableHTML += " title=\""+ biomes1Modded[biome]["note"] +"\""}
    } else {
      tableHTML += " class=\"vanillaBiome\""
    }
    tableHTML += ">"
    tableHTML += "<td>" + biome
    // Check for modded, adds mod's name under biome
    if (Object.keys(biomes1Modded).includes(biome)) {
      tableHTML += "<br><span class=\"modName\">" + biomes1Modded[biome]["mod"] + "</span>"
    }
    tableHTML += "</td>"
    // Adds "Does this exist?" checkbox
    tableHTML += "<td style=\"text-align:center\"> <input style=\"width:1.5em; height:1.5em\""
    tableHTML += "type=\"checkbox\" id=\"" + biome + "ExistsCheckbox\"> </td>"
    tableHTML += "</tr>"
  }
  tableHTML += "</table>"
  document.getElementById('biomeTableDiv').innerHTML = tableHTML
  // Checks (and disables interaction with) all vanilla
  for (const biome of biomes1) {
    document.getElementById(biome + "ExistsCheckbox").checked = true
    document.getElementById(biome + "ExistsCheckbox").disabled = true
  }
}

function setBiomesVanillaOnly() {
  for (const biome of Object.keys(biomes1Modded)) {
    document.getElementById(biome + "ExistsCheckbox").checked = false
  }
}

function genPylonTable() {
  let tableHTML = "<table>"
  tableHTML += "<tr> <th>Biome</th> <th>Require pylon here?</th>"
  for (const pylon of pylons) {
    tableHTML += "<tr"
    // Adds mod id for selection via buttons and whatnot
    if (Object.keys(pylonBiomesModded).includes(pylon)) {
      tableHTML += " modded=\"true\" fromMod=\"" + pylonBiomesModded[pylon]["mod"] + "\""
    }
    tableHTML += ">"
    tableHTML += "<td>" + pylon
    // Check for modded, add mod's name under pylon
    if (Object.keys(pylonBiomesModded).includes(pylon)) {
      tableHTML += "<br><span class=\"modName\">" + pylonBiomesModded[pylon]["mod"] + "</span>"
    }
    tableHTML += "</td>"
    // pylon required?
    tableHTML += "<td style=\"text-align:center\"> <input style=\"width:1.5em; height:1.5em\""
    tableHTML += "type=\"checkbox\" id=\"" + pylon + "Checkbox\"> </td>"
    tableHTML += "</tr>"
  }
  tableHTML += "</table>"
  document.getElementById('pylonTableDiv').innerHTML = tableHTML
}

function includePylonsVanilla() {
  for (const pylon of pylonBiomes) {
    document.getElementById(pylon + "Checkbox").checked = true
  }
}

function genNPCtable() {
  let output = document.getElementById('npcTableDiv')
  let tableHTML = "<table>"
  tableHTML += "<tr> <th>NPC name</th> <th>Include this NPC?</th>"
  tableHTML += "<th>Weighting for this NPC (higher = more important, should be >= 0)</th></tr>"
  for (const person of npcs) {
    tableHTML += "<tr"
    // Adds mod id for selection via buttons and whatnot
    if (Object.keys(npcdictModded).includes(person)) {
      tableHTML += " modded=\"true\" fromMod=\"" + npcdictModded[person]["mod"] + "\""
    }
    tableHTML += ">"
    // name
    tableHTML += "<td>" + person
    // add mod name if applicable
    if (Object.keys(npcdictModded).includes(person)) {
      tableHTML += "<br><span class=\"modName\">" + npcdictModded[person]["mod"] + "</span>"
    }
    tableHTML += "</td>"
    // "should use?" checkbox
    tableHTML += "<td style=\"text-align:center\"> <input style=\"width:1.5em; height:1.5em\""
    tableHTML += "type=\"checkbox\" id=\"" + person + "Checkbox\" onchange=\"updateNumPossibleGroups()\"> </td>"
    // weighting
    tableHTML += "<td style=\"text-align:center\"> <input style=\"width:5em\" type=number "
    tableHTML += "id=\"" + person + "Weighting\" min=0 value=1.0> </td>" 

    tableHTML += "</tr>"
  }
  tableHTML += "</table>"
  output.innerHTML += tableHTML
  setNPCsVanilla()
}

function setNPCsVanilla() {
  for (const person of Object.keys(npcdict)) {
    document.getElementById(person + "Checkbox").checked = true
  }
}
function setNPCsModded() {
  for (const person of Object.keys(npcdict)) {
    document.getElementById(person + "Checkbox").checked = false
  }
}

function genResultsTable(groups) {
  groups.sort((a,b) => {
    let c = a[1].map(y => y.map(x => pylons.indexOf(x)).toString()).join("")
    let d = b[1].map(y => y.map(x => pylons.indexOf(x)).toString()).join("")
      return c > d ? 1 : d > c ? -1 : 0
    })
  let output = document.getElementById("resultTableDiv");
  let tableHTML = "<table>"
  tableHTML += "<tr> <th>Biome(s) for group</th>"
  tableHTML += "<th>NPCs in this group (and their pricing modifier for each biome)</th></tr>"
  for (const group of groups) {
    biome = group[1]
    biome = biome.filter((b,i) => {
      let copyWithoutB = biome.slice(); copyWithoutB.splice(i,1)
      return copyWithoutB.every(y => y.some(x => !b.includes(x)))
    }) // basically if [[hallow],[hallow,desert]] then reduce this to just [[hallow]]
    tableHTML += "<tr><td>"+biome.map(x=>x.join("")).join(" | ")+"</td><td>"
    for (const person of group[0]) {
      tableHTML += person
      let neighbours = group[0].filter((name,index) => name !== person)
      let personHappiness = biome.map(b => (oneHappiness(person,b,neighbours)/npcdict[person]["weighting"]).toFixed(2))
      tableHTML += "(" + personHappiness.join(",") + "), "
    }
    // remove extra comma and space before ending row
    tableHTML = tableHTML.slice(0, -2) + "</td></tr>"
  }

  output.innerHTML += tableHTML + "</table><br>"
}
function showAllResults(data) {
  let output = document.getElementById("resultTableDiv");
  output.innerHTML = ""

  // sort groups within each solution by the people
  for (var solu of data) {
    solu = solu.sort((a,b) => {
    let c = JSON.stringify(a[0])
    let d = JSON.stringify(b[0])
      return c > d ? 1 : d > c ? -1 : 0
    })
  }
  // sort all solutions by the people
  let sortedData = data.sort((a,b) => {
    let c = JSON.stringify(a.map(group=>group[0])); let d = JSON.stringify(b.map(group=>group[0]))
      return c > d ? 1 : d > c ? -1 : 0
  })

  genResultsTable(sortedData[0])

  for (let i=1; i<sortedData.length; i++) {
    let prevsolu = sortedData[i-1]
    let solu = sortedData[i]
    output.innerHTML += "Above has:<br>"
    output.innerHTML += prevsolu.filter(x => !solu.map(y => JSON.stringify(y[0])).includes(JSON.stringify(x[0])))
                                .map(x => x[0].join(", ")).join("<br>")+"<br>"
    output.innerHTML += "<br>Below has:<br>"
    output.innerHTML += solu.filter(x => !prevsolu.map(y => JSON.stringify(y[0])).includes(JSON.stringify(x[0])))
                            .map(x => x[0].join(", ")).join("<br>")+"<br>"
    genResultsTable(solu)
  }
}
function handleWorkerMessage(phase, data) {
  switch (phase) {
    case "mid":
      requestAnimationFrame( () => {
        document.getElementById("newBestSolutionsFound").innerHTML = data[0]
        document.getElementById("timeElapsedSearch").innerHTML = data[1]
        document.getElementById("branchesPruned").innerHTML = data[2]
      })
      break
    
    case "cache":
      requestAnimationFrame( () => {
        document.getElementById("timeElapsedCache").innerHTML = data
      })
      break
  
    case "result":
      requestAnimationFrame(() => showAllResults(data))
      break

    case "done":
      requestAnimationFrame( () => {
        document.getElementById("timeElapsedSearch").innerHTML += " FINISHED"
      })
      break
     
     default:
  }     
}
let myWorker = null
function startSearch() {
  if (myWorker) { myWorker.terminate() }
  myWorker = new Worker("solver.js")
  requestAnimationFrame( () => {
    document.getElementById("timeElapsedCache").innerHTML = "0.000"
    document.getElementById("newBestSolutionsFound").innerHTML = "0"
    document.getElementById("timeElapsedSearch").innerHTML = "0.000"
    document.getElementById("branchesPruned").innerHTML = "0"
    document.getElementById("resultTableDiv").innerHTML = ""
  })
  
  let peopleWeCanUse = []
  for (const person of npcs) {
    if (document.getElementById(person + "Checkbox").checked) {
      peopleWeCanUse.push(person)
      // don't allow non-positive values for the weighting
      npcdict[person]["weighting"] = Math.max(Number.EPSILON, 
        document.getElementById(person + "Weighting").value)
    }
  }
  let minBiomes = []
  for (const biome of pylons) {
    if (document.getElementById(biome + "Checkbox").checked) {
      minBiomes.push(biome)
    }
  }
  let minGroupSize = document.getElementById("minGroupSize").value
  let maxGroupSize = document.getElementById("maxGroupSize").value

  let biomesToSearch = biomesTotal
  if (document.getElementById("useBiomes2Natural").checked) {
    biomesToSearch = biomesToSearch.concat(biomes2Natural)
  }
  if (document.getElementById("useBiomes2Easy").checked) {
    biomesToSearch = biomesToSearch.concat(biomes2Easy, biomes3Easy)
  }
  if (document.getElementById("useBiomes2Rest").checked) {
    biomesToSearch = biomesToSearch.concat(biomes2Rest, biomes3Rest)
  }

  myWorker.postMessage([[npcs,biomesToSearch],[peopleWeCanUse, minGroupSize, maxGroupSize, minBiomes]])
  myWorker.onmessage = function(e){handleWorkerMessage(...e["data"])}
}


genBiomeTable()
genPylonTable()
genNPCtable()
updateNumPossibleGroups()

