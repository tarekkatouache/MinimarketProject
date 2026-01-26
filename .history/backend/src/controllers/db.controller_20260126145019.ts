import prisma from "../utils/prisma.js";
import express, { type Request, type Response } from "express";

export const dbHealthCheck = async (req: Request, res: Response) => {
  try {
    // simple query
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({
      database: "connected",
      result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({
      database: "error",
      error: errorMessage,
    });
  }
};
