import usersController from "~~/server/modules/users/users.controller";

export default defineEventHandler(async (event) => {
  return await usersController.getSingleUser(event);
});
