const pool = require("../../config/database");

module.exports = {
    find: async() => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT id,name,year,CONCAT('http://192.168.8.140:3000/upload/',image_2) as image_1,
                CONCAT('http://192.168.8.140:3000/upload/',image_1) as image_2
                FROM vehicle`,
            );
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    create: async(data) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into vehicle
                (name,year,image_1,image_2)
                values(?,?,?,?)`, [
                    data.name,
                    data.year,
                    data.image_1,
                    data.image_2
                ]
            );
            const fetchResult = await connection.query(
                `SELECT id,name,year,CONCAT('http://192.168.8.140:3000/upload/',image_1) as image_1,
                CONCAT('http://192.168.8.140:3000/upload/',image_2) as image_2
                FROM vehicle WHERE id = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
};