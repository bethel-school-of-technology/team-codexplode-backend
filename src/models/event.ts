import { Document, Schema, Types, model } from 'mongoose';

interface iEvent extends Document {
	mediaCardUrl: string;
	title: string;
	description: string;
	location?: string;
	host: Types.ObjectId;
	cuisine: string;
	meal: string;
	participants: Types.Array<Schema.Types.String>;
}

const eventSchema: Schema = new Schema<iEvent>({
	mediaCardUrl: { type: String },
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	location: { type: String },
	host: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	cuisine: {
		type: String,
		required: true
	},
	meal: {
		type: String,
		required: true
	},
	participants: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

const Event = model<iEvent>('Event', eventSchema);

export { iEvent, Event };
