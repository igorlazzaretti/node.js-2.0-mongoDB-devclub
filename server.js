// Importação do Prisma
import { PrismaClient } from '@prisma/client'
// Modo atual de importar o express
import express from 'express'

const prisma = new PrismaClient()

// Modo antigo de importar o express
//const express = require("express")

const app = express()
app.use(express.json())

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
 *
 */