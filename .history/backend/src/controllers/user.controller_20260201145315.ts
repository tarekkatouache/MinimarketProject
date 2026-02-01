import { create } from "node:domain";
import { prisma } from "../utils/prisma";
import { Request, Response } from "express";

export createUser = async (req: Request, res: Response) => {
  try {
    const
