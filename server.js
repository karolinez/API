import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users=[]

app.post('/usuarios', async (req,res)=>{

   try {
    const newUser = await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }


    })
    res.status(201).json(newUser)


} catch(error){
    console.error(error)
    res.status(500).json({ error:"Erro ai criar usuario"})

    }
})


app.put('/usuarios/:id', async (req,res)=>{

  await prisma.user.update({
    where:{
        id: req.params.id
    },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }


    })
    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req,res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message:"usuario deletado com sucesso!"})

})


//criar uma rota para devolver alguma coisa. Rotas comunicação entre front e back
app.get('/usuarios', async (req, res)=>{
  let users = []

  if (req.query){
    users = await prisma.user.findMany({
        where: {
            name: req.query.name
        }
    })
  } else{
    users = await prisma.user.findMany()
  }


})
app.listen(3000)


/* 
objetivos: Criar um usuario, listar todos os usuarios,editar um usuario e deletar usuario
Route params (get/put/delete).
*/

