const requiredInput = function (input) {
      if(Object.keys(input).length > 0) return true
      return false
}

const validInput = function (input) {
    if (typeof input === 'undefined' || input == null) return false
    if (typeof input !== 'string' || input.trim().length === 0) return false
    return true
}

const validName = function (input) {
    return input.match(/^[a-zA-Z ]+$/)
}

const validEmail = function (input) {
    return input.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)
}

const validPhone = function (input) {
    return input.match(/^[6-9]\d{9}$/)
}

const validAddress = function (input) {
    return input.match(/^[#.0-9a-zA-Z\s,-]+$/)
}

const ValidDOB = function (input) {
    return input.match(/^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
}

module.exports = { requiredInput, validInput, validName, validEmail, validPhone, validAddress, ValidDOB }