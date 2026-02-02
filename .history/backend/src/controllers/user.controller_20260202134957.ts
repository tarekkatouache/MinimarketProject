import { create } from "node:domain";
import prisma from "../utiles/prisma";

import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, role } = req.body;
    if (!username || !role) {
      return res
        .status(400)
        .json({ message: "Username and role are required" });
    }
    const newUser = await prisma.user.create({
      data: {
        username,
        role,
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
        createdAt: "asc",
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
      data: { name, role },
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
