const { followLiving, gotoPosition, resetpathfinder } = require("./pathfind.js")
const { createArray, arrayToVec3 } = require("./util.js")

const commands = new Map()

commands.set("follow", (sender, argv, bot) => {
  let toFollow
  switch (argv[0]) {
    case "none": resetPathfinder(bot)           ; break
    case "me"  : toFollow = sender              ; break
    default    : toFollow = bot.players[argv[0]]; break
  }

  if (toFollow == null)
    return "You should specify a username!"
  if (toFollow.entity == null)
    return "Couldn't find little boy!"
  followLiving(toFollow.entity, 2, bot)
  return "I'm coming..."
})

commands.set("goto", (sender, argv, bot) => {
  if (argv.length < 3)
    return "Wrong usage: int, int, int"
  gotoPosition(arrayToVec3(createArray(3).map((v, i) => parseFloat(argv[i]))), 2, bot)
  return "Pathfinding my way..."
})

commands.set("beep", (sender, argv, bot) => {
  return "Boop!"
})

commands.set("eval", (sender, argv, bot) => {
  return eval(argv.join(" "))
})

const onCommand = (sender, argv, bot) => {
  const command = commands.get(argv.shift())
  if (command == null) {
    bot.chat(`/msg ${sender.username} Wrong command at argv[0]`) 
    return
  }

  let result
  try {
    result = command(sender, argv, bot)
  } catch(err) {
    result = err
  }
  bot.chat(`/msg ${sender.username} ${result}`)
}

module.exports = {
  onCommand
}
