import { RequestHandler } from 'express';
import { Event, iEvent } from '../models/Event';

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const events = await Event.find().populate('host');
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getOneEvent: RequestHandler = async (req, res, next) => {};

export const addEvent: RequestHandler = async (req, res, next) => {
  try {
    const event: iEvent = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const editEvent: RequestHandler = async (req, res, next) => {};

export const deleteEvent: RequestHandler = async (req, res, next) => {};
