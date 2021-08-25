const pool = require("../../config/database");

module.exports = {
    find: async() => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            let result;
            const fetchGalleryResult = await connection.query(
                `SELECT id,name
                FROM gallery`
            );
            result = fetchGalleryResult[0];
            for (var i in result) {
                const fetchGalleryImageResult = await connection.query(
                    `SELECT id,CONCAT('http://192.168.8.140:3000/upload/',image) as url
                    FROM gallery_image WHERE gallery_id = ?`, [result[i].id]
                );
                result[i]['images'] = fetchGalleryImageResult[0];
            }
            console.log(result);
            return result;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    create: async(gallery, gallery_image) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into gallery
                (name)
                values(?)`, [
                    gallery.name
                ]
            );
            const gallery_id = queryResult[0].insertId;
            for (var i in gallery_image) {
                val = gallery_image[i];
                await connection.query(
                    `insert into gallery_image
                    (image,gallery_id)
                    values(?,?)`, [
                        val.filename,
                        gallery_id
                    ]
                );
            }
            let result;
            const fetchResult = await connection.query(
                `SELECT id,name
                FROM gallery WHERE id = ?`, [queryResult[0].insertId]
            );
            const images = await connection.query(
                `SELECT id,CONCAT('http://192.168.8.140:3000/upload/',image) as url
                FROM gallery_image WHERE gallery_id = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            result = fetchResult[0][0];
            result['images'] = images[0];
            return result;
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
};