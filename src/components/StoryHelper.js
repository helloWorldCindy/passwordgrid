export default (pw) => {
  let country = []
  let landmark = []
  let food = []
  let animal = []
  let hint
  pw.forEach((item) => {
    if (item.category === 'country') {
      country.push(item.icon)
    } else if (item.category === 'landmark') {
      landmark.push(item.icon)
    } else if (item.category === 'food') {
      food.push(item.icon)
    } else {
      animal.push(item.icon)
    }
  })
  if (country.length || animal.length) {
    if (!animal.length) {
      hint = `The people in ${concatWords(country)}`
    } else {
      hint = `${concatWords(country)} ${concatWords(animal)}`
    }
    if (!food.length && landmark.length) {
      hint = `${hint} chilled at ${concatWords(landmark)}`
    } else if (food.length && !landmark.length) {
      hint = `${hint} ate ${concatWords(food)}`
    } else if (!food.length && !landmark.length) {
      hint = `${hint} had a good time`
    } else {
      hint = `${hint} ate ${concatWords(food)} at ${concatWords(landmark)}`
    }
  } else if (!(country.length && animal.length)) {
    if (!food.length) {
      hint = `I chilled at ${concatWords(landmark)}`
    } else if (!landmark.length) {
      hint = `I ate ${concatWords(food)}`
    } else {
      hint = `I ate ${concatWords(food)} at ${concatWords(landmark)}`
    }
  }
  return hint
}

const concatWords = (array) => {
  let word = ''
  if (array.length === 1) {
    word = array[0]
  } else {
    array.forEach((item, key) => {
      if (key === array.length - 1) {
        word = `${word} ${item}`
      } else {
        word = `${word} ${item} and`
      }
    })
  }
  return word
}
