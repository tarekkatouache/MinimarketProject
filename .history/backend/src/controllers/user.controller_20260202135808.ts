import prisma from "../utiles/prisma";

import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, role, first_name, last_name, password_hash } = req.body;
    if (!username || !role || !password_hash) {
      return res
        .status(400)
        .json({ message: "Username, role, and password_hash are required" });
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        role,
        first_name,
        last_name,
        password_hash,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while creating user", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        created_at: "asc",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while fetching user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user, role } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { first_name: user.first_name, last_name: user.last_name, role },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while deleting user", error });
  }
};
