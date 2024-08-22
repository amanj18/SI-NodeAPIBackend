import { error } from "console";
import pool from "../DB/db.js";

//End Point to retrieve all the products

// const getProducts = (req, res) => {
//     return res.status(200).send("List of products")
// }

const getProducts = async (req, res) => {
    try {
        console.log("Inside")
        const selectQuery = "select * from practice.products";

        const result = await pool.query(selectQuery);
        console.log("Result" + JSON.stringify(result));

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

export { getProducts, getProductById, getProductsByCategory };

