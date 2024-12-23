// Importação do Prisma
import { PrismaClient } from '@prisma/client'
// Modo atual de importar o express
import express from 'express'
// Importação do CORS para acesso do frontend
import cors from 'cors'


const prisma = new PrismaClient()

// Modo antigo de importar o express
//const express = require("express")

const app = express()
app.use(express.json())

// Utilizando o CORS
// Essa configuração permite que o qualquer frontend acesse a API
app.use(cors())
// Exemplo de cors para um frontend específico
// app.use(cors('https:devclub.com.br'))

// ROTAS
// Read = GET
app.get('/usuarios', async (req,res) => {

    const get = await prisma.user.findMany()

    res.status(200).json(get)
})

// Create = POST
app.post('/usuarios', async (req,res) =>
{
    const post = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json({post})
})

// Update = PUT
app.put('/usuarios/:id', async (req,res) =>
{
    const put = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(200).json({put})
})

// Delete = DELETE
app.delete('/usuarios/:id', async (req,res) =>
{
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({message: "Usuário deletado com sucesso!"})
})

app.listen(3000)


/**
 *  MongoDB Data
 *  User: idlazzaretti
 *  Password: E9lkaeYQXWkUAbas
 *  Url base para o Frontend:
 *  http://localhost:3000
 *
 *  Para rodar esta aplicação, é necessário rodar o comando:
 *  $ node --watch server.js
 */