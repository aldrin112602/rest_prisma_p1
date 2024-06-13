import mysql from 'mysql2'

 const mysqlDB = mysql.createPool({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'typescriptdb'
})

const poolConnection = mysqlDB.promise()

export default poolConnection