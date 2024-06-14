import mysql from 'mysql2'

 const mysqlDB = mysql.createPool({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prisma_db_1'
})

const poolConnection = mysqlDB.promise()

export default poolConnection