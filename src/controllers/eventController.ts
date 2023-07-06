import { RequestHandler } from 'express';
import { Event, iEvent } from '../models/event';
import { iUser } from '../models/User';
import { verifyUser } from '../services/auth';

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate<{ host: iUser }>('host')
      .populate<{ participants: iUser[] }>('participants');
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getOneEvent: RequestHandler = async (req, res, next) => {};

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

export const editEvent: RequestHandler = async (req, res, next) => {};

export const deleteEvent: RequestHandler = async (req, res, next) => {};
