const router = require("express").Router();
const Category = require("../models/Category")

router.post("/addCategory", async (req, res) => {
    try {
        // Lets get the payload from the request body
        const { category, manufacturer } = req.body;

        // Lets create a new Vehicle
        const newcCategory = new Category({
            category,
            manufacturer,
        });
        await newcCategory.save();
        res.send("New Category Added successfully");
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const afterDeleteItem = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category Deleted");
  } catch (err) {
    res.json(err);
  }
});

router.get("/allcategories", async (req, res) => {
    try {
      const categories = await Category.find({});
     
      res.send(categories);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/updateCategory", async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.body.id, req.body.values);
      res.status(200).json({updatedCategory});
    } catch (err) {
      res.json(err);
    }
  });

module.exports = router;
