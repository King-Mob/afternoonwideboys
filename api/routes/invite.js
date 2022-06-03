const { createInvite, checkRole } = require("../queries/invite");
const { isTokenValid } = require("../queries/auth");

const inviteRoutes = [
  {
    method: "POST",
    path: "/invite",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
    handler: async (request) => {
      const { userId, token, newInvite } = request.payload;

      if ((await isTokenValid(token)) == false)
        return {
          result: "error",
          errorMessage: "invalid token to create invite",
        };

      const role = await checkRole(userId);

      if (!role.success) {
        return { success: false, message: "lacking role to send emails" };
      }

      const result = createInvite(newInvite);

      return result;
    },
  },
  {
    method: "GET",
    path: "/invite/roles/{userId}",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
    handler: async (request) => {
      const result = await checkRole(request.params.userId);

      return result;
    },
  },
];

module.exports = {
  inviteRoutes,
};
