const fire = require('./../config/Firebase')
const db = fire.firestore()
db.settings({
    timestampsInSnapshots: true
})

module.exports = {
    isRegistered: (req, res, next) => {
        const { phone } = req.body
        var allData = []
        const doc = db.collection('tb_user').where('phone', '==', phone).get()
            .then(snapshot => {
                snapshot.forEach((result) => {
                    const id = result.id
                    const hasil = {
                        ...result.data(),
                        id
                    }
                    allData.push(hasil)
                })
                if (allData.length < 1) {
                    next()
                } else {
                    res.status(401).json({
                        status: 401,
                        message: 'Phone number already used'
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
}