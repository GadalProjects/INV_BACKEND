import type { Request, Response } from 'express';
import User from '../models/User.js';

export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role: role as any, isActive: true }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users by role', error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all users', error });
  }
};
