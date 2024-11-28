import { response, request } from "express";
import Category from "../Models/category.model.js"
import User from "../models/users.model.js";

export const addCategory = async (req, res) => {
    try {

        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.add == true){
            return res.status(400).send("you do not have permissions to add")
        }

        const { name, description } = req.body;

        const nameToUpper = name.toUpperCase();

        const existingCategory = await Category.findOne({ name: nameToUpper });
        if (existingCategory) {
            return res.status(400).send(`Medicine with the name "${nameToUpper}" already exists.`);
        }

        const category = new Category({ name:nameToUpper, description });

        await category.save();

        return res.status(200).send("The category added successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const showCategories = async (req, res) => {
    try {
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.view == true){
            return res.status(400).send("you do not have permissions to view")
        }

        const categories = await Category.find();
        
        if (!categories.length > 0) {
            return res.status(400).send("The categories is not found");
        }

        return res.status(200).json(categories)

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const deleteCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.delete == true){
            return res.status(400).send("you do not have permissions to delete")
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send("The category does not exist.");
        }

        return res.status(200).send("Category deleted successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.update == true){
            return res.status(400).send("you do not have permissions to add")
        }

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).send("The category does not exist.");
        }

        const { name, description } = req.body;

        const nameToUpper = name.toUpperCase();

        await Category.findByIdAndUpdate(id, { name:nameToUpper, description })

        return res.status(200).send("Category update successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}