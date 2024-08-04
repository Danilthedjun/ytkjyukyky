import createHttpError from 'http-errors';

import { getPerDay, getPerMonth } from '../services/water.js';

export const getWaterPerDayController = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw createHttpError(400, 'User ID is required');
  }
  const data = await getPerDay(_id);
  if (!data) {
    throw createHttpError(404, 'Data not found');
  }
  res.json({
    status: 200,
    message: 'Success find water per day',
    data,
  });
};

export const getWaterPerMonthController = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw createHttpError(400, 'User ID is required');
  }
  const data = await getPerMonth(_id);
  if (!data) {
    throw createHttpError(404, 'Data not found');
  }
  res.json({
    status: 200,
    message: 'Success find water per month',
    data,
  });
};
