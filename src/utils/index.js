const getNumberFromString = string => {
  return string?.match(/[0-9]/)[0]
}

const formatDate = (date, arg) => {
  const toFormat = new Date(date)

  return toFormat
    .toLocaleDateString('en-EN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      ...arg
    })
    .replace(/ /g, ' ')
}

const formatCriterias = (a, b, sortBy) => {
  // a or b could be a Number, String or Object ( planet)
  let itemA = parseFloat(a[sortBy]) || a[sortBy]?.name || a[sortBy]
  let itemB = parseFloat(b[sortBy]) || b[sortBy]?.name || b[sortBy]
  // coming from height or mass
  if (typeof itemA !== typeof itemB) {
    // we want the 'unkown' to be less
    if (typeof itemA === 'string') itemA = 0
    if (typeof itemB === 'string') itemB = 0
  }

  return [itemA, itemB]
}

let previousKey = ''
let inverted = false

const sortArray = (array, sortBy) => {
  // handling asc & desc order
  inverted = previousKey === sortBy ? !inverted : false
  previousKey = sortBy

  return array.sort((a, b) => {
    const [itemA, itemB] = formatCriterias(a, b, sortBy)
    let comparison

    if (itemA > itemB) {
      comparison = 1
    } else if (itemA < itemB) {
      comparison = -1
    }

    return inverted ? comparison * -1 : comparison
  })
}

const formatResidentsData = residentsArray => {
  return residentsArray.map(resident => {
    resident.created = formatDate(resident.created)
    resident.edited = formatDate(resident.edited)
    resident.height = resident.height.replace(/,/g, '')
    resident.mass = resident.mass.replace(/,/g, '')
  })
}

const formatPlanetInfo = planetInfo => {
  return {
    planet: {
      name: planetInfo.name,
      diameter: planetInfo.diameter,
      climate: planetInfo.climate,
      population: planetInfo.population
    }
  }
}

const saveToLocalStorage = (keyName, values) => {
  localStorage.setItem(keyName, JSON.stringify(values))
}

const getFromLocalStorage = keyName => {
  return JSON.parse(localStorage.getItem(keyName))
}

const removeFromLocalStorage = keyName => {
  localStorage.removeItem(keyName)
}

export {
  sortArray,
  formatDate,
  formatPlanetInfo,
  saveToLocalStorage,
  formatResidentsData,
  getFromLocalStorage,
  getNumberFromString,
  removeFromLocalStorage
}
