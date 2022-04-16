import mongoose, { Schema, Document, SchemaOptions } from "mongoose";

// interface LotteryItem {
//     number: string;
//     qty: string;
//     rating: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
//     status: 'Available' | 'Empty' | 'SoldOut' | 'OutOfDate';
//     desc: string;
// }

interface LotteryDocument extends Document {
    // dateReward: Date,
    // open: Date,
    // close: Date,
    // lotteries: LotteryItem[]
   
    number: string;
    qty: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    status: 'Available' | 'Empty' | 'SoldOut' | 'OutOfDate';
    desc: string;
    img: string;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret._id,
                delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
}

const lotterySchema = new Schema({
    number: String,
    qty: Number,
    rating: Number,
    status: String,
    desc: String,
    img: String
    // dateReward: {
    //     type: Date
    // },
    // open: {
    //     type: Date
    // },
    // close: {
    //     type: Date
    // },
    // lotteries: [
    //     {
    //         number: String,
    //         qty: Number,
    //         rating: Number,
    //         status: String,
    //         desc: String            
    //     }
    // ]
}, options);

const Lottery = mongoose.model<LotteryDocument>('lottery', lotterySchema);

export default Lottery;
