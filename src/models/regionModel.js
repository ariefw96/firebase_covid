const fire = require('./../config/Firebase')
const db = fire.firestore()
db.settings({
    timestampsInSnapshots: true
})

module.exports = {
    get: () =>{
        return db.collection('tb_region').get()
    },
    add: (body) =>{
        return db.collection('tb_region').add(body)
    }
}