const {
  sendNotifications,
  checkRole,
  sendEmail,
} = require("../queries/emails");
const { isTokenValid } = require("../queries/auth");

const emailsRoutes = [
  {
    method: "GET",
    path: "/emails",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
    handler: async (request) => {
      const result = await sendNotifications();

      return result;
    },
  },
  {
    method: "POST",
    path: "/emails",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"],
      },
    },
    handler: async (request) => {
      const { userId, token, email } = request.payload;

      const tokenValid = await isTokenValid(token);

      if (tokenValid == false)
        return { success: false, message: "invalid token to post text" };

      const role = await checkRole(userId);

      if (!role.success) {
        return { success: false, message: "lacking role to send emails" };
      }

      const result = await sendEmail(email);

      return result;
    },
  },
  {
    method: "GET",
    path: "/emails/roles/{userId}",
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
  emailsRoutes,
};
