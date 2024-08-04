import WaterCollection from '../db/models/Water.js';

export const getPerDay = async (userId) => {
  return WaterCollection.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $addFields: {
        waterVolume: { $toDouble: '$waterVolume' },
      },
    },
    {
      $group: {
        _id: '$date',
        average: {
          $avg: '$waterVolume',
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        average: 1,
      },
    },
  ]);
};
export const getPerMonth = async (userId) => {
  return WaterCollection.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $addFields: {
        waterVolume: { $toDouble: '$waterVolume' },
      },
    },
    {
      $group: {
        _id: {
          $substr: ['$date', 0, 7],
        },
        average: {
          $avg: '$waterVolume',
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        average: 1,
      },
    },
  ]);
};
