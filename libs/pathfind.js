const { pathfinder, Movements, goals: { GoalFollow, GoalNear } } = require("mineflayer-pathfinder")

const initalizePathfinder = bot => {
  bot.loadPlugin(pathfinder)
  const mcData = require("minecraft-data")(bot.version)
  const defaultMoves = new Movements(bot, mcData)
  defaultMoves.canDig = false
  defaultMoves.placeCost = 999999
  defaultMoves.maxDropDown = 999999
  bot.pathfinder.setMovements(defaultMoves)
}

const followLiving = (entity, distFrom, bot) => {
  bot.pathfinder.setGoal(new GoalFollow(entity, distFrom), true)
}

const gotoPosition = (position, distFrom, bot) => {
  bot.pathfinder.setGoal(new GoalNear(position.x, position.y, position.z, distFrom))
}

const resetPathfinder = bot => {
  bot.pathfinder.setGoal(null)
}

module.exports = {
  initalizePathfinder,
  followLiving,
  gotoPosition,
  resetPathfinder
}
