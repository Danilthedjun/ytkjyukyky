import WaterCollection from '../db/models/Water.js';
import mongoose from 'mongoose';

// export const getWaterById = (waterId)=> WaterCollection.findById(waterId);

export const createWater = (data) => WaterCollection.create(data);

// export const deleteWater = (filter) => WaterCollection.findOneAndDelete(filter);

export const deleteWaterIdService = async (id) => {
  const waterData = await WaterCollection.findByIdAndDelete(id);
  return waterData;
};

export const updateWaterIdService = async (id, waterData) => {
  const updatedRecord = await WaterCollection.findByIdAndUpdate(
    id,
    { ...waterData, localDate: '' },
    { new: true },
  );
  return updatedRecord;
};

export const getPerDay = async (userId, date) => {
  const startDate = `${date}T00:00:00.000Z`;
  const endDate = `${date}T23:59:59.999Z`;

  return await WaterCollection.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: 1,
        waterVolume: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
};

export const getPerMonth = async (userId, month) => {
  const startDateStr = `${month}-01T00:00:00.000Z`;
  const endDateStr = new Date(
    new Date(startDateStr).setMonth(new Date(startDateStr).getMonth() + 1),
  ).toISOString();

  return await WaterCollection.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: startDateStr,
          $lt: endDateStr,
        },
      },
    },
    {
      $addFields: {
        date: { $dateFromString: { dateString: '$date' } },
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: '$date' },
        },
        totalWaterVolume: { $sum: '$waterVolume' },
      },
    },
    {
      $sort: { '_id.day': 1 },
    },
    {
      $project: {
        _id: 0,
        day: '$_id.day',
        totalWaterVolume: 1,
      },
    },
  ]);
};
