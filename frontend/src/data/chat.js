import image1 from 'assets/images/chat/1.webp';
import image2 from 'assets/images/chat/2.webp';
import image3 from 'assets/images/chat/3.webp';
import image4 from 'assets/images/chat/4.webp';
import image5 from 'assets/images/chat/5.webp';
import image6 from 'assets/images/chat/6.webp';
import image7 from 'assets/images/chat/7.webp';
import dayjs from 'dayjs';
import { users } from './users';

export const conversations = [
  {
    id: 'M50KOJQ44LIOB21M',
    recipients: [users[5]],
    messages: [
      {
        id: 1,
        senderId: 5,
        type: 'received',
        text: 'do you know the director Francis Ford Coppola  & movies ?',
        createdAt: dayjs().subtract(23, 'h').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 5,
        type: 'received',
        text: 'Tell me about his best works',
        createdAt: dayjs().subtract(23, 'h').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 14,
        type: 'sent',
        text: 'yeah, The Godfather (1972)  is one of the best.',
        createdAt: dayjs().subtract(3, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        text: "Now you come to me, and you say, 'Don Corleone, give me justice.' But you don't ask with respect. You don't offer friendship. You don't even think to call me Godfather. Instead, you come into my house on the day my daughter is to be married, and you ask me to do murder. For money. - my favorite dialogue.",
        createdAt: dayjs().subtract(5, 'm').toDate(),
        reactions: [
          {
            emoji: '❤️',
            userId: 5,
          },
        ],
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 14,
        type: 'sent',
        text: 'sent my photos, i am sharing the movie link',
        createdAt: dayjs().subtract(6, 'm').toDate(),
        reactions: [
          {
            emoji: '❤️',
            userId: 5,
          },
        ],
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 5,
        type: 'received',
        attachments: {
          media: [
            { type: 'image', src: image1 },
            { type: 'image', src: image2 },
            { type: 'image', src: image3 },
          ],
        },
        createdAt: dayjs().subtract(7, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 5,
        type: 'received',
        text: "Thanks... I'm going to watch the movie. And check the photos, I sent what you need. Let me know if I missed anything.",
        createdAt: dayjs().subtract(8, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        attachments: { files: [{ name: 'The Godfather(1972).zip', format: 'zip' }] },
        createdAt: dayjs().subtract(9, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: true,
  },
  {
    id: 'M50KOUB205NA3LKZ',
    recipients: [users[0]],
    messages: [
      {
        id: 1,
        senderId: 0,
        type: 'received',
        text: "Hey, Guess what? I'm planning a weekend tour to the mountains. Want to join?",
        createdAt: dayjs().subtract(10, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 14,
        type: 'sent',
        text: 'seriously? That sounds amazing! Which mountains are you thinking about?',
        createdAt: dayjs().subtract(11, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 0,
        type: 'received',
        text: "The Blue Ridge Mountains. I've heard the views are breathtaking, especially this time of year.",
        createdAt: dayjs().subtract(12, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        text: 'oh yeah, sent me pictures',
        createdAt: dayjs().subtract(13, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 14,
        type: 'sent',
        text: " What's the plan?",
        createdAt: dayjs().subtract(14, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 0,
        type: 'received',
        attachments: {
          media: [
            { type: 'image', src: image4 },
            { type: 'image', src: image5 },
            { type: 'image', src: image6 },
            { type: 'image', src: image7 },
          ],
        },
        reactions: [
          {
            emoji: '❤️',
            userId: 14,
          },
        ],
        createdAt: dayjs().subtract(15, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 0,
        type: 'received',
        text: "We'd leave Saturday morning, hike a few trails, maybe camp overnight, and then explore some waterfalls on Sunday.",
        createdAt: dayjs().subtract(16, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        text: "they're stunning!",
        createdAt: dayjs().subtract(17, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 9,
        senderId: 14,
        type: 'sent',
        text: 'Camping, huh? do we need to bring our own gear, or are you renting stuff?',
        createdAt: dayjs().subtract(18, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 10,
        senderId: 0,
        type: 'received',
        text: "I've got a tent and sleeping bags. You'd just need your clothes, snacks, and maybe a flashlight.",
        createdAt: dayjs().subtract(19, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 11,
        senderId: 14,
        type: 'sent',
        text: 'Sweet. Are we driving or carpooling?',
        createdAt: dayjs().subtract(20, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 12,
        senderId: 0,
        type: 'received',
        text: 'I thought we could carpool to save on gas.',
        createdAt: dayjs().subtract(21, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 13,
        senderId: 0,
        type: 'received',
        text: "Plus, it's more fun with music and road trip snacks!",
        createdAt: dayjs().subtract(22, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 14,
        senderId: 14,
        type: 'sent',
        text: "totally agree. count me in! I'll pack my stuff and bring some marshmallows for a campfire.",
        createdAt: dayjs().subtract(23, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 15,
        senderId: 0,
        type: 'received',
        text: "Awesome! It's going to be so much fun. Let's finalize the details tomorrow.",
        createdAt: dayjs().subtract(24, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 16,
        senderId: 14,
        type: 'sent',
        text: "Sounds like a plan. Can't wait! 🤞😊",
        createdAt: dayjs().subtract(25, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: false,
  },
  {
    id: 'M50KP6BYT9KLCVOZ',
    conversationName: 'Note Ninjas 🥷',
    recipients: [users[1], users[8], users[11], users[15]],
    messages: [
      {
        id: 1,
        senderId: 1,
        type: 'received',
        text: "Hey everyone, quick update about tomorrow's exam. A lot of you have been asking if it can be rescheduled.",
        createdAt: dayjs().subtract(26, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 11,
        type: 'received',
        text: "Yeah, it's too soon! I barely started studying. Can we push it back?",
        createdAt: dayjs().subtract(27, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 8,
        type: 'received',
        text: 'Same here. I have back-to-back assignments to submit this week.',
        createdAt: dayjs().subtract(28, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        type: 'received',
        senderId: 1,
        text: "I spoke to the professor about rescheduling. Unfortunately, they said it's not possible because of the tight schedule this semester.",
        reactions: [
          {
            userId: 8,
            emoji: '😢',
          },
          {
            userId: 11,
            emoji: '😡',
          },
        ],
        createdAt: dayjs().subtract(29, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 15,
        type: 'received',
        text: 'Ugh, seriously?',
        createdAt: dayjs().subtract(30, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        type: 'received',
        senderId: 15,
        text: "Didn't they consider that we have other exams too?",
        createdAt: dayjs().subtract(31, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 1,
        type: 'received',
        text: 'Trust me, I tried my best to convince them. I even brought up how many of us are struggling.',
        createdAt: dayjs().subtract(32, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 14,
        type: 'sent',
        text: "thanks for trying, CR. It's just frustrating.",
        createdAt: dayjs().subtract(33, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 9,
        type: 'received',
        senderId: 11,
        text: 'Frustrating is an understatement.',
        createdAt: dayjs().subtract(34, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 10,
        type: 'received',
        senderId: 11,
        text: "You should've pushed harder!",
        createdAt: dayjs().subtract(35, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 11,
        type: 'received',
        senderId: 11,
        text: "What's the point of being the CR if you can't handle this, Manami?",
        createdAt: dayjs().subtract(36, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 12,
        type: 'received',
        senderId: 1,
        text: "I understand you're upset, Amelia, but I really did everything I could. The professor just wouldn't budge.",
        createdAt: dayjs().subtract(37, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 13,
        type: 'received',
        senderId: 8,
        text: "Amelia, it's not like the CR has magical powers to change the schedule. Chill out.",
        createdAt: dayjs().subtract(38, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 14,
        type: 'received',
        senderId: 11,
        text: 'Still, it feels like not enough effort was made.',
        createdAt: dayjs().subtract(39, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 15,
        type: 'received',
        senderId: 1,
        text: "I'm sorry you feel that way. If you want, you can talk to the professor directly too. Maybe a group effort will help in the future.",
        createdAt: dayjs().subtract(40, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 16,
        type: 'sent',
        senderId: 14,
        text: "let's not blame Lucy. It's a tough situation, and they're doing their best.",
        createdAt: dayjs().subtract(41, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 17,
        type: 'received',
        senderId: 15,
        text: "Yeah, it's not fair to take it out on them. Let's focus on preparing instead of arguing.",
        createdAt: dayjs().subtract(42, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 18,
        senderId: 11,
        type: 'received',
        text: 'Fine. Whatever.',
        createdAt: dayjs().subtract(43, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 19,
        senderId: 1,
        type: 'received',
        text: "Thanks, everyone. I know it's stressful, but we'll get through this.",
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 20,
        senderId: 1,
        type: 'received',
        text: 'If anyone needs help with the material, let me know.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 21,
        senderId: 14,
        type: 'sent',
        text: 'Let’s organize that study group and just power through this.',
        reactions: [
          {
            userId: 11,
            emoji: '👍',
          },
          {
            userId: 15,
            emoji: '❤️',
          },
        ],
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 22,
        senderId: 1,
        type: 'received',
        text: 'Sounds good. Let’s focus on that. We’ve got this!',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: null,
      },
    ],
    unreadMessages: 1,
    starred: false,
  },
  {
    id: 'M50KPH8HTAIWIK60',
    recipients: [users[15]],
    messages: [
      {
        id: 1,
        senderId: 14,
        type: 'sent',
        text: 'Hey, Michael . I heard you’re taking a leave of absence from school. Is everything okay?',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 2,
        senderId: 15,
        type: 'received',
        text: 'Yeah, everything’s fine. I just need some time to sort out a few personal things and recharge. It’s been a bit overwhelming lately.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 3,
        senderId: 14,
        type: 'sent',
        text: 'that makes sense. taking care of yourself is important.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 4,
        senderId: 14,
        type: 'sent',
        text: 'How long will you be away?',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 5,
        senderId: 15,
        type: 'received',
        text: 'Probably a semester. I’ve already spoken with the counselor, and they helped me with the process.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 6,
        senderId: 15,
        type: 'received',
        text: 'Of course! I’ll still hang out and keep up with what’s happening. I just need a break from the coursework for now.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 7,
        senderId: 14,
        type: 'sent',
        text: 'Totally understandable. If you need anything or just want to talk, I’m here.',
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
      {
        id: 8,
        senderId: 15,
        type: 'received',
        text: 'Thanks. That means a lot. I’ll see you around!',
        reactions: [
          {
            userId: 14,
            emoji: '❤️',
          },
        ],
        createdAt: dayjs().subtract(44, 'm').toDate(),
        readAt: new Date(),
      },
    ],
    unreadMessages: 0,
    starred: false,
  },
];
