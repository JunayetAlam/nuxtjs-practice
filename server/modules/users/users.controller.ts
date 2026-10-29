import { H3Event } from "@nuxt/nitro-server/h3";
import usersService from "./users.service";
import sendResponse from "~~/server/libs/sendResponse";
import { users } from "~/data/users";

const getUsers = async (event: H3Event) => {
  const query = getQuery(event);
  const users = await usersService.getUsers(query);
  return sendResponse({ data: users, statusCode: 200 });
};

const getSingleUser = async (event: H3Event) => {
  const id = getRouterParams(event).id;
  const user = await usersService.getSingleUser(id);
  return sendResponse({ data: { data: user }, statusCode: 200 });
};

const getAdminUsers = async () => {
  const data = await usersService.getAdminUsers();
  return sendResponse({ data: { data }, statusCode: 200 });
};

export default {
  getUsers,
  getSingleUser,
  getAdminUsers,
};
