const { _db } = require("./query");
const { DateTime } = require("luxon");

const sendNotifications = async () => {
  const db = await _db;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const users = await db.EmailPreferencesWithHavers.find({
    Preference: "loves",
  });
  const stickers = await db.Stickers.find(
    {},
    { order: [{ field: "Id", direction: "desc" }] }
  );

  let notifyTime;

  for (let sticker of stickers) {
    const stickerDate = DateTime.fromISO(sticker.Created.toISOString());
    if (stickerDate.diffNow("days").days > 1) {
      notifyTime = stickerDate;
      break;
    }
  }

  //what if user doesn't have a view
  //what if user doesn't have an email preference

  //practice creating DateTime from js date object

  users.forEach(async (user) => {
    const latestView = await db.Views.findOne(
      { UserLogger: user.id },
      { order: [{ field: "Id", direction: "desc" }] }
    );
    if (notifyTime > DateTime(latestView.Time)) {
      const msg = {
        to: user.Email,
        from: "pleaseloveus@afternoonwideboys.com",
        subject: user.name + ", you have to see these stickers!",
        html: '<strong><a href="https://www.afternoonwideboys.com/#/wall">Click here</a> now to see the stickers!</strong>',
      };

      sgMail.send(msg).catch((error) => {
        console.error(error);
      });
    }
  });

  return { success: true };
};

module.exports = {
  sendNotifications,
};
