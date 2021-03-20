const express = require('express')
const firebaseRouter = express.Router()

const fire = require('./../config/Firebase')
const db = fire.firestore()
db.settings({
    timestampsInSnapshots: true
})

firebaseRouter.post('/add', (req, res) => {
    const { body } = req

    const doc = db.collection('tb_user').add(body)
        .then((result) => {
            res.status(200).json({
                status: 200,
                message: `Success Input Data`
            })
        }).catch((error) => {
            console.log(error)
        })
})

firebaseRouter.get('/get', (req, res) => {
    var allData = []
    const doc = db.collection('tb_user').get()
        .then(snapshot => {
            snapshot.forEach((result) => {
                const id = result.id
                const hasil = {
                    ...result.data(),
                    id
                }
                allData.push(hasil)
            })
            // console.log(allData)
            res.json(allData)
        }).catch((error) => {
            console.log(error)
        })
})

firebaseRouter.patch('/update/:id', (req, res) => {
    const { id } = req.params
    const { body } = req
    const doc = db.collection('tb_user').doc(id).update(body)
        .then((result) => {
            res.status(200).json({
                status: 200,
                message: 'Data updated at ID = ' + id + ' :))'
            })
        }).catch((error) => {
            console.log(error)
        })
})

firebaseRouter.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    const doc = db.collection('tb_user').doc(id).delete()
        .then((result) => {
            res.status(200).json({
                status: 200,
                message: `Data deleted at ID = ${id} :))`
            })
        }).catch((error) => {
            console.log(error)
        })
})

module.exports = firebaseRouter
