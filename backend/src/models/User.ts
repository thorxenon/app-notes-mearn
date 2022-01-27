import { Schema, model, connection } from 'mongoose';

type UserType = {
    name: [string],
    email: string,
    password: string,
    token: string,
    isAdmin: boolean,
    pic: string
}

const schema = new Schema<UserType>({
    name:{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    token:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    pic:{
        type: String,
        required: true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }

},
{
    timestamps: true
});

const modelName: string = 'User';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<UserType>(modelName, schema);