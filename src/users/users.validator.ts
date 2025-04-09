/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Joi from 'joi';

export const createUsersSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

export const updateUsersSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string(),
  }).min(1),
};
export const getUsersSchema = {
  query: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string(),
  }),
};
export const getUsersByIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
export const deleteUsersSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
