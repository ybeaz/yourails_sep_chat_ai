import { MessageType } from '../@types/MessageType'
import { MessageEventType } from '../@types/MessageEventType'

export const messages01R: Omit<MessageType, 'position' | 'isTail'>[] = [
  {
    messageID: 'random_string_1',
    conversationID: '["1","4"]',
    profileID: '4',
    createdAt: 1646145000000,
    eventType: MessageEventType['chatMessage'],
    text: 'Need a web app for appointment management.',
  },
  {
    messageID: 'random_string_2',
    conversationID: '["1","4"]',
    profileID: '1',
    createdAt: 1646145300000,
    eventType: MessageEventType['chatMessage'],
    text: 'Details on how you want the app to work?',
  },
  {
    messageID: 'random_string_3',
    conversationID: '["1","4"]',
    profileID: '4',
    createdAt: 1646145640000,
    eventType: MessageEventType['chatMessage'],
    text: 'Schedule, cancel, notifications. Show past appts in calendar view.',
  },
  {
    messageID: 'random_string_4',
    conversationID: '["1","4"]',
    profileID: '1',
    createdAt: 1646145960000,
    eventType: MessageEventType['chatMessage'],
    text: 'Specific design or layout requirements?',
  },
  {
    messageID: 'random_string_5',
    conversationID: '["1","4"]',
    profileID: '4',
    createdAt: 1646146300000,
    eventType: MessageEventType['chatMessage'],
    text: 'Clean, modern, easy to use.',
  },
  {
    messageID: 'random_string_6',
    conversationID: '["1","4"]',
    profileID: '1',
    createdAt: 1646146620000,
    eventType: MessageEventType['chatMessage'],
    text: 'How many users?',
  },
  {
    messageID: 'random_string_7',
    conversationID: '["1","4"]',
    profileID: '4',
    createdAt: 1646146980000,
    eventType: MessageEventType['chatMessage'],
    text: 'Around 50.',
  },
  {
    messageID: 'random_string_8',
    conversationID: '["1","4"]',
    profileID: '1',
    createdAt: 1646147340000,
    eventType: MessageEventType['chatMessage'],
    text: 'Deadline for project?',
  },
  {
    messageID: 'random_string_9',
    conversationID: '["1","4"]',
    profileID: '4',
    createdAt: 1646147700000,
    eventType: MessageEventType['chatMessage'],
    text: '3 months.',
  },
  {
    messageID: 'random_string_10',
    conversationID: '["1","4"]',
    profileID: '1',
    createdAt: 1646148060000,
    eventType: MessageEventType['chatMessage'],
    text: 'Starting project, will keep you updated.',
  },
]
