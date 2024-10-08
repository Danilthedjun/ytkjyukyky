
import UsersCollection from "../db/models/Users.js";
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => UsersCollection.findOne(filter);

export const userService = {
  updateUser: (filter, updateData) => {
    return UsersCollection.findOneAndUpdate(filter, updateData, { new: true });
  },
  getUserById: (filter) => {
    return UsersCollection.findOne(filter);
  }
};

export const signup = async (data) =>
  UsersCollection.create({
    ...data,
    password: await hashValue(data.password),
  });

