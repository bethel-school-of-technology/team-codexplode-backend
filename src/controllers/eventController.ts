import { RequestHandler } from 'express';
import { Event, iEvent } from '../models/event';
import { iUser } from '../models/User';
import { verifyUser } from '../services/auth';

export const getAllEvents: RequestHandler = async (req, res) => {
	try {
		const events = await Event.find({})
			.populate<{ host: iUser }>('host', '_id username firstName lastName')
			.populate<{ participants: iUser[] }>(
				'participants',
				'_id username firstName lastName'
			);
		res.status(200).json(events);
	} catch (error) {
		res.status(404).json(error);
	}
};

export const getOneEvent: RequestHandler = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id)
			.populate<{ host: iUser }>('host', '_id username firstName lastName')
			.populate<{ participants: iUser[] }>(
				'participants',
				'_id username firstName lastName'
			);
		res.status(200).json(event);
	} catch (error) {
		res.status(404).json(error);
	}
};

export const addEvent: RequestHandler = async (req, res, next) => {
	let user: iUser | null = await verifyUser(req);

	if (!user) {
		return res.status(401).json('Unauthorized');
	}

	try {
		let eventData = req.body;
		eventData.host = user._id;
		const event: iEvent = await Event.create(req.body);
		res.status(201).json(event);
	} catch (error) {
		res.status(400).json(error);
	}
};

export const editEvent: RequestHandler = async (req, res, next) => {
	const searchId = req.params.id;
	const user: iUser | null = await verifyUser(req);
	const newEvent = req.body;
	const eventFound = await Event.findById(searchId);

	if (!user) {
		return res.status(401).json('Unauthorized');
	}

	if (eventFound && eventFound.host.equals(user._id)) {
		try {
			await eventFound.updateOne(newEvent);
			res.status(200).json(newEvent);
		} catch (error) {
			res.status(400).json(error);
		}
	} else {
		res.status(404).json('Event not found');
		console.log(eventFound?._id.equals(newEvent._id));
	}
};

export const addParticipant: RequestHandler = async (req, res, next) => {
	let user: iUser | null = await verifyUser(req);
	let eventFound = await Event.findById(req.params.id);

	if (!user) {
		return res.status(401).json('Unauthorized');
	}
	console.log(user);

	if (!eventFound) {
		return res.status(404).json('Event not found');
	}

	try {
		let participants = eventFound?.participants ?? [];
		const index = participants.indexOf(user._id);

		if (index > -1) {
			return res.status(200).send('Participant already added');
		} else {
			participants.push(user._id);
			eventFound.participants = participants;
			eventFound.save();

			return res.status(200).send('Participant added');
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

export const removeParticipant: RequestHandler = async (req, res, next) => {
	let user: iUser | null = await verifyUser(req);
	let eventFound = await Event.findById(req.params.id);

	if (!user) {
		return res.status(401).json('Unauthorized');
	} else if (!eventFound || eventFound === null) {
		return res.status(404).json('Event not found');
	}

	try {
		let participants = eventFound?.participants ?? [];
		const index = participants.indexOf(user._id);

		if (index > -1) {
			participants.splice(index, 1); // 2nd parameter means remove one item only
			eventFound.participants = participants;
			eventFound.save();

			return res.status(200).send('Participant removed');
		} else {
			return res.status(404).send('Participant not found');
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
	let user: iUser | null = await verifyUser(req);
	let eventFound = await Event.findById(req.params.id);

	if (!user) {
		return res.status(401).json('Unauthorized');
	} else if (!eventFound || eventFound === null) {
		return res.status(404).json('Event not found');
	}

	if (eventFound && eventFound.host.equals(user._id)) {
		try {
			await eventFound.deleteOne();
			res.status(200).json('Event deleted');
		} catch (error) {
			res.status(400).json(error);
		}
	} else {
		res.status(401).json('Unauthorized');
	}
};
