import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
      const { category } = req.body

      await categoryModel.create({
        category
      })

      res.status(200).json({
        message: 'Category created successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };

export const getAllCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find()
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };

export const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params
      const category = await categoryModel.findByIdAndDelete(id)
      if (!category) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
      res.status(200).json({
        message:'category deleted successfully'
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };