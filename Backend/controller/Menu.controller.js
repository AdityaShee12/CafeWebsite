import Menu from "../models/Menu.model.js";

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { isAvailable: true };

    if (category) query.category = category;
    if (featured === "true") query.featured = true;

    // Optional: allow admin to see all items even if not available
    if (req.user && req.user.role === "admin") {
         query = {};
         if (category) query.category = category;
         if (featured === "true") query.featured = true;
    }

    const items = await Menu.find(query).sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItemById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req, res) => {
  try {
    const item = await Menu.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res) => {
  try {
    let item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });

    item = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Menu item not found" });

    await item.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
