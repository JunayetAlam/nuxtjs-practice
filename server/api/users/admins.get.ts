import usersController from "~~/server/modules/users/users.controller";

export default defineEventHandler(async () => {
  return await usersController.getAdminUsers();
});
