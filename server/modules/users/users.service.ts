import { users } from "~/data/users";

const getUsers = async (query?: Record<string, unknown>) => {
  const limit = query?.limit ? Number(query.limit) : 6;
  const page = query?.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const searchParams = query?.search
    ? query.search.toString().toLowerCase()
    : "";
  let usersList = users;
  if (searchParams) {
    usersList = usersList.filter((user) =>
      user.name.toLowerCase().includes(searchParams),
    );
  }

  usersList = usersList.slice(skip, skip + limit);

  return {
    data: usersList,
    meta: {
      total: users.length,
      page,
      limit,
      totalPages: Math.ceil(users.length / limit),
    },
  };
};

const getSingleUser = async (id?: string) => {
  if (!id)
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }
  return user;
};

const getAdminUsers = async () => {
  const userList = await users.filter((item) => item.role === "admin");
  return userList;
};

export default {
  getUsers,
  getSingleUser,
  getAdminUsers,
};
