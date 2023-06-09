import fs from "node:fs/promises";

const getLogHookInventoryService = async (): Promise<any> => {
  const data = await fs.readFile("./hook_inventory.json");
  const parseData = JSON.parse(data.toString());
  return parseData;
};

export { getLogHookInventoryService };
