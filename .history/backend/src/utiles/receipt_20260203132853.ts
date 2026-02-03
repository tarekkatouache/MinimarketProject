// src/utils/receipt.ts
export const generateReceiptNumber = async (): Promise<string> => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const count = await prisma.sales.count({
    where: { created_at: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  });
  return `REC-${date}-${(count + 1).toString().padStart(4, "0")}`;
};
