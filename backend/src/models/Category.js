const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
