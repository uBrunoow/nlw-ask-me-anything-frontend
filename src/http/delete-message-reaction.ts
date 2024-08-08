interface DeleteMessageReactionRequest {
  roomId: string;
  messageId: string
}

export const DeleteMessageReaction = async ({ roomId, messageId }: DeleteMessageReactionRequest) => {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'DELETE',
  });
}