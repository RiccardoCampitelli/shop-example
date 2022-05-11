export interface Item {
  id: string;
  name: string;
  price: string;
}

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchShopItems = async (): Promise<Item[]> => {
  const response = await fetch("./__fixtures__/items.json");

  const json = await response.json();

  await timeout(100);

  // throw new Error('shii')

  return json.items;
};
