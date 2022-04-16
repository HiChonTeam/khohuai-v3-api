import Lottery from "../Models/Lottery";
import { Request, Response } from 'express';
import Cart from "../Models/Cart";

export const UpdateCart = async (req: Request, res: Response) => {

    const { number, qty } = req.body;
    const request_qty: 1 | -1 | 0 = qty; // +1 (increase) | -1 (descrease) | 0 (remove); 

    const uid = req.session.uid;

    try {
        const [existingLottery, existingMyCart]: any[] = await Promise.all([Lottery.findOne({ number }), Cart.findOne({ uid })]);

        if (existingLottery) {

            const img_lottery = existingLottery.img;

            if (existingMyCart) {

                    const found = existingMyCart.all_items.find((item: any) => item.number == number);

                    if (!found) {

                        if (request_qty === 1) {
                            //Add new item to cart
                            existingMyCart.all_items.push({
                                number: number,
                                qty: 1,
                                status: 'Available',
                                img: img_lottery
                            })
                            existingMyCart.save();
                            return res.json({ meaages: 'Add new item seccess', data: existingMyCart.all_items });
                        }
                        else {
                            return res.json({ meaages: 'Number not found' });
                        }
                    }
                    else {
                        let myCart: any[] = existingMyCart.all_items;

                        if (request_qty === 0) {
                            myCart = myCart.filter((item) => item.number !== number);
                        }
                        else if (request_qty === 1) {

                            myCart = myCart.map((item_my_cart: any) => {

                                if (item_my_cart.number === number) {

                                    console.log('add');

                                    if (item_my_cart.qty < existingLottery.qty) {
                                        return {
                                            ...item_my_cart,
                                            qty: (item_my_cart.qty + request_qty)
                                        }
                                    }
                                    else {
                                        //ปรับจำนวนในตะกร้า ให้เท่ากับที่คงเหลือใน stock
                                        return {
                                            ...item_my_cart,
                                            qty: existingLottery.qty
                                        }
                                    }
                                }
                                return item_my_cart
                            })

                        }
                        else if (request_qty == -1) {

                            myCart = myCart.map((item_my_cart: any) => {

                                if (item_my_cart.number === number) {

                                    if (item_my_cart.qty > 1) {
                                        return {
                                            ...item_my_cart,
                                            qty: (item_my_cart.qty + request_qty)
                                        }
                                    }

                                }
                                return item_my_cart
                            })
                        }

                        existingMyCart.all_items = myCart;
                        existingMyCart.save();
                        return res.json({ meaages: 'Update item seccess', myCart });
                    }

            } else {
                //create first item in cart
                const newData = await  Cart.create({
                    uid,
                    all_items: [
                        {
                            number: number,
                            qty: 1,
                            status: 'Available',
                            img: img_lottery
                        }
                    ]
                })
                return res.json({ meaages: 'Add first item seccess', data: newData.all_items});
            }


        }
        else {
            return res.json({ meaages: 'Lottery not found' });
        }

    } catch (error) {
        console.log(error)
    }
}

export const getMyCart = async (req: Request, res: Response) => {

    const uid = req.session.uid;

    try {
        const existingMyCart = await Cart.findOne({ uid });

        if (existingMyCart) {
            res.json(existingMyCart.all_items);
        }
        else {
            res.json([]);
        }
    } catch (error) {
        console.log(error);
    }
}

export const removeItemMyCart = async (req: Request, res: Response) => {

    const { number } = req.body;

    try {
        await Cart.findOneAndDelete({ number });
        return res.json({ message: 'remove item success' });
    } catch (error) {

    }
}