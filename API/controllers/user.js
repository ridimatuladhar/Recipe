import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs'



export const getProfile = async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    try {
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters
    const { name, bio, profilePicture, currentPassword, newPassword } = req.body;

    try {
        // Fetch the user using the userId from params
        const user = await User.findById(userId);

        // Check if user was found
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user is trying to change their password
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect.' });
            }

            // Hash new password and save it
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Update other profile fields
        user.name = name !== undefined ? name : user.name;
        user.bio = bio !== undefined ? bio : user.bio;
        user.profilePicture = profilePicture !== undefined ? profilePicture : user.profilePicture;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        console.error('Error updating profile:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};



