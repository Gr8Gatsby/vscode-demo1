import { Schema, model, connect } from "mongoose";

let db = null;

const CategorySchema = new Schema(
    { categoryName: String },
    { timestamps: true }
);
const CategoryModel = model("Category", CategorySchema, "Bookstore");

export const init = async () => {
    if (!db) {
        db = await connect(process.env["CosmosDbConnectionString"]);
    }
};
export const addItem = async (doc) => {
    const modelToInsert = new CategoryModel();
    modelToInsert["categoryName"] = doc.name;

    return await modelToInsert.save();
};
export const findItemById = async (id) => {
    return await CategoryModel.findById(id);
};
export const findItems = async (query = {}) => {
    return await CategoryModel.find({});
};
export const deleteItemById = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
};

const TodoSchema = new Schema(
    {
        id: Number,
        title: String,
        created_date: Date,
        done_date: Date,
        status: String
    },
    { timestamps: true }
)
const TodoModel = model("Todo", TodoSchema, "Todo");
export const addTodo = async (doc) => {
    const modelToInsert = new TodoModel();
    modelToInsert["title"] = doc.title;
    modelToInsert["created_date"] = doc.created_date;
    modelToInsert["done_date"] = doc.done_date;
    modelToInsert["status"] = doc.status;

    return await modelToInsert.save();
}

export const getTodos = async () => {
    return await TodoModel.find({});
}