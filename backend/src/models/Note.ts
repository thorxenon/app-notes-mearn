import mongoose, { Schema, model, connection } from 'mongoose';

type NoteType = {
    title: string,
    content: string,
    category: string,
    user: mongoose.Schema.Types.ObjectId
}

const schema = new Schema<NoteType>({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},
{
    timestamps: true
});

const modelName: string = 'Note';

export default (connection && connection.models[modelName]) ?
    connection.models[modelName]
:
    model<NoteType>(modelName, schema);