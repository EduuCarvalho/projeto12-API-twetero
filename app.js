import express from 'express'
import cors from 'cors'


const app = express();

app.use(cors());

app.use(express.json());

const users = [{
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
}]

app.post("/sign-up",(req,res)=>{
    const {username,avatar} = req.body;

    if (!username || !avatar){
        res.status(400).send("Preencha todos os campos");
        return
    }
  
    const userRegister = users.find((user)=>user.username === username)
    if (userRegister){
        res.status(401).send("usuario ja cadastrado")
        return;
    }

    users.push(req.body);
    res.send("OK")
})

const tweets = [
	{
		username: "bobesponja",
			avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
		  tweet: "eu amo o hub"
	}
]

app.post("/tweets",(req,res)=>{
    const {username,tweet}= req.body;

    if (!username || !tweet){
        res.status(400).send("Preencha todos os campos");
        return
    }
    const userFilter = users.filter((u)=> u.username=== username)
    const avatar= userFilter[0].avatar
    tweets.unshift({
        username,
        avatar,
        tweet
    });
    res.send("OK")
})

app.get("/tweets",(red,res)=>{
    if (tweets.length >= 10){
        res.send(tweets.slice(0,10))
        return
    }
    res.send(tweets);
})

app.listen(5000, ()=>{
    console.log("Rodando porta 5000")
})