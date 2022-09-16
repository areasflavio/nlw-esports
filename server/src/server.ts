import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

import {
  convertHourStringToMinutes,
  convertMinutesToHourString,
} from './utils/dateTime';

const server = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3333;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

server.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

server.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

server.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      weekDays: true,
      yearsPlaying: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const WEEKDAYS = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const formattedAds = ads.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(',').map((day) => WEEKDAYS[Number(day)]),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd),
  }));

  return res.json(formattedAds);
});

server.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    },
    select: {
      discord: true,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

server.listen(PORT, () => console.log(`Server is up on port... ${PORT}`));
