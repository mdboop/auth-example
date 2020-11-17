const express = require("express")
const bcrypt = require("bcrypt")

const PORT = 3000
const SALT_ROUNDS = 3

// Let's pretend this is our database.
const database = {}

const sessions = {}

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, stranger!")
})

app.get("/api/inspect", (req, res) => {
  return res.json(database)
})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body

  const hashedPassword = database[username]

  if (!username || !password) {
    return res.sendStatus(400)
  }

  try {
    const result = await bcrypt.compare(password, hashedPassword)

    if (result) {
      // TODO: make this a token
      sessions[username] = true
      return res.sendStatus(200)
    } else {
      return res.sendStatus(403)
    }
  } catch (e) {
    console.error(err)
    return res.sendStatus(403)
  }
})

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.sendStatus(403)
  }

  if (database[username]) {
    return res.sendStatus(409)
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, result) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }

    database[username] = result
    return res.sendStatus(200)
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
