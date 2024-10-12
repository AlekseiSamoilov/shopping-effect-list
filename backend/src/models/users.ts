import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    login: string;
    password: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        minlength: [2, 'Минимальная длина имени 2 символа'],
        maxlength: [15, 'Максимальная длина имени 15 символов'],
        required: [true, 'Имя обязательно'],
        trim: true,
    },
    login: {
        type: String,
        minlength: [4, 'Минимальная длина логина 4 символа'],
        maxlength: [10, 'Максимальная длина логина 10 символов'],
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Минимальная длина пароля 6 символов'],
        select: false,
    }
}, {
    timestamps: true
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});
export default mongoose.model<IUser>('User', userSchema);