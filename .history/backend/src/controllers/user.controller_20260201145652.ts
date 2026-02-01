import { create } from "node:domain";
import { prisma } from "../utils/prisma";
import { Request, Response } from "express";

export createUser = async (req: Request, res: Response) => {
  try {
    const {name ,role} = req.body;
   if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required" });
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        role,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error while creating user", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });
    res.status(200).json(users);
  } catch(error) {
    res.status(500).json({ message: "Internal server error while fetching users", error });