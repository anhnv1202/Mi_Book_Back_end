import passport from '@config/passport.config';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { APP_LOCALES, BASE_URL, Locales } from '@common/constants/global.const';
import { Config } from '@config/common.config';
import LogService from '@config/log.config';
import AppDataSource from '@database/data_source';
import { handleAppError, handleError } from '@middlewares/error.handling.middleware';
import { AppError, ManagedError } from '@models';
import routes from '@routes/index.router';
import { emailQueue, transporter } from '@services/mail.service';
import sockets from '@socket/index.socket';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import * as i18n from 'i18n';
import * as path from 'path';
import { Server } from 'socket.io';
import swaggerUi from 'swagger-ui-express';
import { setLocal } from './middlewares/locales.middleware';
import * as swaggerDocument from './swagger.json';

dotenv.config();
const app = express();
app.use(json({ limit: Config.LIMIT_REQUEST_BODY }));
app.use(
  urlencoded({
    extended: true,
    limit: Config.LIMIT_REQUEST_BODY,
  }),
);
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(cookieParser());
if (Config.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(passport.initialize());

i18n.configure({
  locales: APP_LOCALES,
  defaultLocale: Locales.EN,
  objectNotation: true,
  directory: path.join(__dirname, '/assets/lang'),
});
app.use(i18n.init);
app.use(setLocal);

const v1Router = express.Router();

v1Router.use(cookieParser());
v1Router.use(express.json());
v1Router.use(bodyParser.urlencoded({ extended: false }));
app.use(BASE_URL, v1Router);
routes(v1Router);

app.use(
  (
    instance: ManagedError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    const { error } = instance;
    if (error instanceof AppError) {
      handleAppError(req, res)(error);
    } else {
      handleError(req, res)(error);
    }
  },
);

setImmediate(async () => {
  LogService.logInfo(JSON.stringify(AppDataSource));

  try {
    await AppDataSource.initialize();
    LogService.logInfo('Database connected');
  } catch (dbConnectError) {
    let errorMsg = '';
    if (typeof dbConnectError === 'string') {
      errorMsg = dbConnectError;
    } else if (dbConnectError && typeof dbConnectError === 'object') {
      errorMsg = dbConnectError.toString();
    }
    LogService.logError('First start failed to connect to DB', errorMsg);
  }

  const server = app.listen(Config.APP_PORT, () => {
    LogService.logInfo('App listening on', `http://localhost:${Config.APP_PORT}`);
  });

  // emailQueue.on('error', (error) => {
  //   LogService.logError('Queue error:', error.message);
  // });

  emailQueue.on('completed', (job) => {
    LogService.logInfo('Job completed:', job.id as string);
  });

  // emailQueue.on('failed', (job, error) => {
  //   LogService.logError('Job failed:', job.id as string, error.message);
  // });
  emailQueue.process(async (job) => {
    const { to, subject, html } = job.data;
    const mailOptions = {
      from: 'MiBook (No-Reply)',
      to,
      subject,
      html,
    };
    await transporter.sendMail(mailOptions);
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  io.on('connection', (socket) => {
    LogService.logInfo('SOCKET', 'Socket connect', socket.id);
    for (const element of sockets) {
      const s = element;
      socket.on(s.event, (data) => s.handler(socket, data));
      socket.on('disconnect', () => {
        LogService.logInfo('SOCKET', 'Socket disconnect', socket.id);
        socket.removeAllListeners();
      });
    }
  });
  process.on('SIGTERM', () => {
    LogService.logInfo('SIGTERM signal received: closing HTTP server');
    io.close(() => {
      LogService.logInfo('SOCKET', 'Shutdown socket server');
    });
    server.close(() => {
      LogService.logInfo('HTTP server closed');
    });
  });
});
