const activateItemInSlot = (slot, bot) => {
  bot.setQuickBarSlot(slot)
  bot.activateItem()
  bot.deactivateItem()
}

const leftClickWindow = (slot, bot) => {
  bot.clickWindow(slot, 0, 0)
}

module.exports = {
  activateItemInSlot,
  leftClickWindow
}
