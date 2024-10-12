import mongoose, { Schema, Document } from "mongoose";

export interface IShopingItem extends Document {
    title: string;
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
}

const shoppingItemSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Обязательное поле'],
        minlength: [2, 'Минимальная длина 2 символа'],
        maxlength: [30, 'Максимальная длина 30 символов'],
        trim: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

shoppingItemSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model<IShopingItem>('ShoppingItem', shoppingItemSchema);