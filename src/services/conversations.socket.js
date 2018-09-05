import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');

export const joinSocket = (person) => {
  socket.emit('joinSocket', person);
};

export const leaveSocket = (person) => {
  socket.emit('leaveSocket', person);
};

export const postAnswer = (answer) => {
  socket.emit('postAnswer', answer);
};

export const postQuestion = (question) => {
  socket.emit('postQuestion', question);
};

export const subscribeToConversations = (cb) => {
  socket.on('getConversations', conversations => cb(conversations));
};

export const unsubscribeToConversations = () => {
  socket.off('coversations');
};

export const subscribeSocketErrors = (cb) => {
  socket.on('handleError', error => cb(error));
};

export const unsubscribeSocketErrors = () => {
  socket.off('handleError');
};

export const subscribeNotifications = (cb) => {
  socket.on('newNotification', notification => cb(notification));
};

export const unsubscribeNotifications = () => {
  socket.off('newNotification');
};