// Placeholder for your database models/queries.
// The code below assumes you have models or query builders that can perform these operations.
const User = require('../models/user.model');
const UserRole = require('../models/user_role.model');
const Role = require('../models/role.model');

// GET /api/myprofile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the 'users' table
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the role for the user by joining user_roles and roles tables
    const userRole = await UserRole.findOne({ where: { user_id: userId } });
    let roleName = null;

    if (userRole) {
      const role = await Role.findByPk(userRole.role_id);
      if (role) {
        roleName = role.role_name;
      }
    }

    // Prepare the data to be sent back
    const profileData = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role_name: roleName,
      photo_url: user.photo_url,
    };

    res.status(200).json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// PATCH /api/myprofile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // Use the correct column names from the provided schema
    const { full_name, email } = req.body;

    // Check if at least one field is provided
    if (!full_name && !email) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Update the provided fields using the correct column names
    const updatedUser = await User.update(
      { full_name, email },
      { where: { user_id: userId }, returning: true, plain: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// POST /api/myprofile/photo
exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Assume the file path is correct and save to the 'photo_url' column
    const photoUrl = `/uploads/${file.filename}`;

    const updatedUser = await User.update(
      { photo_url: photoUrl },
      { where: { user_id: userId }, returning: true, plain: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      photo_url: photoUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};