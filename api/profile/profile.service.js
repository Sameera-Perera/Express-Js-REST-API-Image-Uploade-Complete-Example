const pool = require("../../config/database");

module.exports = {
    find: async() => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT id,first_name,last_name,address,contact_number,
                CONCAT('http://192.168.8.140:3000/upload/',profile_picture) AS profile_picture
                FROM profile`,
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
                `insert into profile
                (first_name,last_name,address,contact_number,profile_picture)
                values(?,?,?,?,?)`, [
                    data.first_name,
                    data.last_name,
                    data.address,
                    data.contact_number,
                    data.profile_picture
                ]
            );
            const fetchResult = await connection.query(
                `SELECT id,first_name,last_name,address,contact_number,
                CONCAT('http://192.168.8.140:3000/upload/',profile_picture) AS profile_picture
                FROM profile WHERE id = ?`, [queryResult[0].insertId]
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