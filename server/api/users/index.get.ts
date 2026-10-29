import usersController from "~~/server/modules/users/users.controller";
import { users } from "./../../../app/data/users";
export default defineEventHandler(async (event) => {
  return await usersController.getUsers(event);
});
