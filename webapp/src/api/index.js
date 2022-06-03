import { config } from "../config";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? config.serverAddress.remote
    : config.serverAddress.local;

export const trySignUp = async (signUpInfo) => {
  const signUpRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpInfo),
  };

  const result = await fetch(`${baseUrl}/register`, signUpRequest);
  return result.json();
};

export const tryLogin = async (loginInfo) => {
  const loginRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  };

  const result = await fetch(`${baseUrl}/login`, loginRequest);
  return result.json();
};

export const tryGetContents = async () => {
  const result = await fetch(`${baseUrl}/contents`);
  return result.json();
};

export const tryGetUserContents = async (userId) => {
  const result = await fetch(`${baseUrl}/contents/${userId}`);
  return result.json();
};

export const tryGetTexts = async () => {
  const result = await fetch(`${baseUrl}/texts`);
  return result.json();
};

export const tryGetVideo = async (videoId) => {
  const result = await fetch(`${baseUrl}/videos/${videoId}`);
  return result.json();
};

export const tryGetComments = async (videoId) => {
  const result = await fetch(`${baseUrl}/comments/${videoId}`);
  return result.json();
};

export const tryNewText = async (user, newText) => {
  const newTextRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newText: {
        value: newText,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/texts`, newTextRequest);
  return result.json();
};

export const tryNewTextAsReply = async (user, newText, toId, toType) => {
  const newTextRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newText: {
        value: newText,
        toId,
        toType,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/textsasreply`, newTextRequest);
  return result.json();
};

export const tryNewVideo = async (user, title, videoUrl) => {
  const newVideoRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newVideo: {
        title,
        videoUrl,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/videos`, newVideoRequest);
  return result.json();
};

export const tryNewVideoAsReply = async (
  user,
  title,
  videoUrl,
  toId,
  toType
) => {
  const newVideoRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newVideo: {
        title,
        videoUrl,
        toId,
        toType,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/videosasreply`, newVideoRequest);
  return result.json();
};

export const tryNewComment = async (user, newComment) => {
  const newCommentRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newComment: {
        value: newComment.value,
        videoId: newComment.videoId,
        timelinePosition: newComment.timelinePosition,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/comments`, newCommentRequest);
  return result.json();
};

export const tryGetUser = async (userId) => {
  const result = await fetch(`${baseUrl}/users/${userId}`);
  return result.json();
};

export const tryGetUserTexts = async (userId) => {
  const result = await fetch(`${baseUrl}/texts/${userId}`);
  return result.json();
};

export const tryGetItems = async (userId) => {
  const result = await fetch(`${baseUrl}/items/${userId}`);
  return result.json();
};

export const tryUpdateItem = async (token, updatedItem) => {
  const itemRequest = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updatedItem,
      token: {
        type: 5,
        value: token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/items`, itemRequest);
  return result.json();
};

export const tryCreateItem = async (token, newItem) => {
  const itemRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newItem,
      token: {
        type: 5,
        value: token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/items`, itemRequest);
  return result.json();
};

export const tryGetStickers = async () => {
  const result = await fetch(`${baseUrl}/stickers`);
  return result.json();
};

export const tryNewSticker = async (user, newSticker) => {
  const newStickerRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newSticker,
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/stickers`, newStickerRequest);
  return result.json();
};

export const tryGetEmailRole = async (user) => {
  const result = await fetch(`${baseUrl}/emails/roles/${user.id}`);
  return result.json();
};

export const trySendEmail = async (user, email) => {
  const newEmailRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/emails`, newEmailRequest);
  return result.json();
};

export const tryGetInviteRole = async (user) => {
  const result = await fetch(`${baseUrl}/invite/roles/${user.id}`);
  return result.json();
};

export const tryCreateInvite = async (user, inviteCode) => {
  const newInviteRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newInvite: {
        value: inviteCode,
      },
      userId: user.id,
      token: {
        type: 5,
        value: user.token,
      },
    }),
  };

  const result = await fetch(`${baseUrl}/invite`, newInviteRequest);
  return result.json();
};
