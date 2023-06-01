import pino from 'pino';
import config from 'config';
import pinoPretty from 'pino-pretty';

export default pino({
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level'),
}, pinoPretty());

