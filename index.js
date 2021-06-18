const { randInt, randStr } = require("./libs/util.js")
const { activateItemInSlot, leftClickWindow } = require("./libs/botting.js")
const { initalizePathfinderMoves } = require("./libs/pathfind.js")
const { onCommand } = require("./libs/commands.js")

const config = require("./config.json")

const mineflayer = require("mineflayer")

const masters = new Set(config.masters)

const bot = mineflayer.createBot({
  username: randStr(randInt(7, 14)),
  host: "play.rinaorc.com",
  version: "1.8.9"
})

bot.on("message", message => console.log(message.toAnsi()))

bot.once("spawn", _ => {
  console.log(`:: Joining as ${bot.username}`)
  initalizePathfinderMoves(bot)

  bot.addChatPatternSet(
    "login_required",
    [/^Enregistrez-vous avez: "\/register \(motdepasse\) (\d{4})"$/],
    { repeat: false, parse: true }
  )
  
  bot.addChatPatternSet(
    "private_message",
    [/^⚑ ➥ De ([^:]+): (.*)$/],
    { parse: true }
  )
})
  
bot.once(
  "chat:login_required",
  ([[captcha]]) => {
    bot.once("spawn", onCaptchaComplete)
    bot.chat(`/register ${bot.username}P4ss ${captcha}`)
  }
)

const onCaptchaComplete = async _ => {
  await prepareJoinGame()
  await attemptJoinGame()
  onGameJoin()
}

const prepareJoinGame = _ => new Promise(resolve => {
  bot.once("windowOpen", _ => {
    leftClickWindow(11, bot)
    bot.once("windowClose", _ => {
      resolve()
    })
  })
})

const attemptJoinGame = _ => new Promise(resolve => {
  bot.once("spawn", () => { resolve() })

  const anon = _ => {
    activateItemInSlot(0, bot)
    bot.once("windowOpen", async _ => {
      if (hasJoinedGame) return
      console.log(`:: Opened selector: ${_.title}`)

      await bot.waitForTicks(30)
      leftClickWindow(29, bot)

      bot.once("windowClose", _ => {
        console.log(`:: Closed selector: ${_.title}`)
        anon()
      })
    })
  }

  anon()
})

let hasJoinedGame = false
const onGameJoin = _ => {
  hasJoinedGame = true
  console.log("Joined Game!")

  bot.on("chat:private_message", ([[sender, message]]) => {
    if (masters.has(sender))
      onCommand(bot.players[sender], message.split(" "), bot)
  })
}
