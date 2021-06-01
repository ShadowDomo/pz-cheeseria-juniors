import { CartItemType, Transaction } from './cartController';

const fs = require('fs');
const cheeses = require('./data/cheeses.json');

// contains all the purchases made. Would use a db in prod, and not store
// in memory.
let purchases: Transaction[] = [];

export async function makePurchase(transaction: Transaction): Promise<boolean> {
  const newPurchases: Transaction[] = [...purchases, transaction];
  purchases = newPurchases; 
  return true;
}

export async function getCheeses(): Promise<CartItemType[]> {
  return cheeses;
}

export async function getRecentPurchases(): Promise<Transaction> {
  if (purchases.length > 0) {
    const lastPurchase: Transaction = purchases[purchases.length - 1];
    return lastPurchase;
  }

  return [];
}
