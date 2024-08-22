import { error } from "console";
import pool from "../DB/db.js";

//End Point to retrieve all the products

// const getProducts = (req, res) => {
//     return res.status(200).send("List of products")
// }

const getProducts = async (req, res) => {
    try {
        // console.log("Inside")
        const selectQuery = "select * from practice.products";

        const result = await pool.query(selectQuery);
        // console.log("Result" + JSON.stringify(result));

        // if (result != null && result.rowCount > 0) {
        //     return res.status(200).json(result.rows);
        // }

        if (res.statusCode === 200 && result.rowCount > 0) {
            return res.status(200).json(result.rows);

        }
        else {
            console.log("Couldn't retrieve data")
            return res.status(404).json({ error: 'No Data Found' })
        }

        // if (res.status === 200) {
        //     return res.status(200).json(result.rows)
        // }
        // else {
        //     console.log("Couldn't retrieve data")
        //     return res.status(404).json({ error: 'Data Not Found' })
        // }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectQuery = `select * from practice.products where productid = ${id}`;
        const result = await pool.query(selectQuery);
        if (res.statusCode === 200) {
            if (result.rowCount === 1) {
                return res.status(200).json(result.rows)
            }
            else {
                return res.status(404).json({ error: 'Id Not Found' })
            }
        }
        else {
            return res.status(400).json({ error: 'Error Retrieving Data' })
        }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        // console.log("Category " + category);
        const selectQuery = `select * from practice.products where category = '${category}'`;
        const result = await pool.query(selectQuery);
        if (res.statusCode === 200) {
            if (result.rowCount >= 1) {
                return res.status(200).json(result.rows)
            }
            else {
                return res.status(404).json({ error: 'No Products found for the given category' })
            }
        }
        else {
            return res.status(400).json({ error: 'Error Retrieving Data' })
        }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}

const getProductByPrice = async (req, res) => {
    try {
        // console.log("Inside")  ;
        const min = req.query.min;
        const max = req.query.max;
        const selectQuery = `select * from practice.products where  price between ${min} and ${max}`;
        const result = await pool.query(selectQuery);
        if (res.statusCode === 200) {
            if (result.rowCount >= 1) {
                return res.status(200).json(result.rows)
            }
            else {
                return res.status(404).json({ error: 'No Products found for the given category' })
            }
        }
        else {
            return res.status(400).json({ error: 'Error Retrieving Data' })
        }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}

const createNewProduct = async (req, res) => {
    try {
        const { productname, price, category, star_rating, description, productcode, imageurl } = req.body;

        const insertQuery = `INSERT into practice.products(productname, price, category, star_rating, description, productcode, imageurl) values($1, $2, $3, $4,  $5, $6, $7) RETURNING *;`
        const values = [productname, price, category, star_rating, description, productcode, imageurl]

        // Validate Input
        if (!productname || !price || !category || !star_rating || !description || !productcode || !imageurl) {
            return res.status(400).json({ error: 'All Fields are required' });
        }
        else {
            const result = await pool.query(insertQuery, values);
            return res.status(201).json(result.rows[0]);
        }
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
};

const updateProductStarRating = async (req, res) => {
    try {
        const id = req.params.id;
        const { price, star_rating } = req.body;

        const updateQuery = `UPDATE practice.products SET price = $1 ,star_rating = $2 WHERE productid = ${id} ;`
        const values = [price, star_rating]
        const result = await pool.query(updateQuery, values);

        // Validate Input
        if (!price && !star_rating) {
            return res.status(400).json({ error: 'Product not found' });
        }
        else {
            return res.status(200).send("Product Updated Successfully");
        }
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
}

const deleteProductById = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM practice.products WHERE productid=${id}`;
        const result = await pool.query(deleteQuery);
        if(result.rowCount === 1){
            return res.status(200).json({message: 'Product deleted successfully'});
        }
        else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        console.log(error.message);
    }
}


export { getProducts, getProductById, getProductsByCategory, getProductByPrice, createNewProduct ,updateProductStarRating ,deleteProductById};

