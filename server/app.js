const express = require("express")
const fs = require("fs")
const cors = require("cors")
const bodyparser = require("body-parser")

const app = express()
app.use(cors())
let USERS = []
app.use(bodyparser.json())


app.get("/", (req, res) => {
    res.json(USERS)
})

app.post("/new-user", (req, res) => {
    let newUser = req.body
    /*promenjeno */
    
    if(USERS.length > 0) {
       newUser['id'] = USERS[USERS.length -1]['id'] +1
    }else {
        newUser['id'] = 1
    }
    
    USERS.push(newUser)
    //da bi korisnik ostao sacuvan pri sledecem ukljucivanju servera moramo da uradimo ovo
    fs.writeFileSync("./podaci/users2.json", JSON.stringify(USERS))

    res.json(newUser)
    /*promenjeno */
    
    
})
//brisanje korisnika
app.delete('/delete-user',(req,res) => {
    let isDelited = false
    for(let i = 0; i < USERS.length; i++) {
        if(USERS[i]['id'] == req.body['user_id']) {
            USERS.splice(i,1)

            fs.writeFileSync("./podaci/users2.json", JSON.stringify(USERS))
            isDelited = true
            break;
        }
    }
    res.json({"message" : isDelited ? "user deleted." : "error delted"})
})




app.listen(3000, () => {
    console.log("Server is started http://127.0.0.1:3000")
    const rawText = fs.readFileSync("./podaci/users2.json")
    USERS = JSON.parse(rawText)
    console.log("All work")
})