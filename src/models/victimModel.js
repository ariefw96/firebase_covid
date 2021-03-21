const fire = require('./../config/Firebase')
const db = fire.firestore()
db.settings({
    timestampsInSnapshots: true
})

module.exports = {
    addVictim: (body) => {
        return db.collection('tb_victim').add(body)
    },
    listVictim: (id) => {
        let query = db.collection('tb_victim')
        query = query.where('created_by', '==', id)
        return query.get()
    },
    listVictimByRegion: (id) => {
        return db.collection('tb_victim').where('location', '==', id).get()
    },
    listAllVictim: () => {
        return db.collection('tb_victim').orderBy('date_updated', 'desc').get()
    },
    updateVictim: (id, body) => {
        return db.collection('tb_victim').doc(id).update(body)
    },
    deleteVictim: (id) => {
        return db.collection('tb_victim').doc(id).delete()
    },
    getSingle: (id) =>{
        return db.collection('tb_victim').doc(id).get()
    },

}