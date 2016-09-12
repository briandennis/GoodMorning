const exec = require('child_process').exec
const chalk = require('chalk')
const error = require('./error')

module.exports = (api, list) => {

  try {
    if (list) {
      executeList(api, api.get(list))
    } else {
      api.get().forEach(executeList.bind(api))
    }
  } catch (e) {
    error(e)
  }

}

function executeList (api, list) {
  const openCommands = {
    darwin: 'open',
    win32: 'start',
    linux: 'xdg-open'
  }

  const sites = list.sites.map( (site) => {
    return `http://${site}`
  })

  if (sites.length) {
    console.log(chalk.yellow('\launching...'))
    exec(`${openCommands[process.platform]} ${sites.join(' ')}`)
    console.log(chalk.green('Done.'))
  }
}
