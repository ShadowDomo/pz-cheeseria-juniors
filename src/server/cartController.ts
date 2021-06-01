import * as model from './cartModel';
import * as express from 'express';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount?: number;
};

export interface Transaction extends Array<CartItemType>{};

export async function getCheeses(req: express.Request, res: express.Response) {
  const cheeses: CartItemType[] = await model.getCheeses();
  res.json(cheeses);
}

export async function makePurchase(req: express.Request, res: express.Response) {
   const transaction: Transaction = req.body;
   const resp = await model.makePurchase(transaction);
   if (resp) {
     res.send({status: 'Success!'});
     return;
   }

   res.send({error: 'Failed.'});
}

export async function getRecentPurchases(req: express.Request, res: express.Response) {
  const resp = await model.getRecentPurchases();
  res.send(resp);
}

