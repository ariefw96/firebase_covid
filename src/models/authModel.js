const fire = require('./../config/Firebase')
const db = fire.firestore()
db.settings({
    timestampsInSnapshots: true
})


module.exports = {
    authSignup: (body) => {
        const doc = db.collection('tb_user').add(body)
        return doc
    },

    authLogin: async (body) => {
        const doc = await db.collection('tb_user').where('phone', '==', body.phone).where('password', '==', body.password).get()
        return doc
    },
}