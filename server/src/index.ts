import config from 'config';
import { SetupServer } from "./server";
import logger from './logger';

enum ExitStatus {
    Failure = 1,
    Success = 0,
}

(async (): Promise<void> => {
    try {
      const server = new SetupServer(config.get('App.port'));
      await server.init();
      server.start();
      console.log(`Server listening on port: ${config.get('App.port')}`);
      
      const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
      
      for (const exitSignal of exitSignals)
        process.on(exitSignal, async () => {
          try {
            await server.close();     
            logger.info(`App exited with success`);      
            process.exit(ExitStatus.Success);
          } catch (err) {           
            logger.error(`App exited with error: ${err}`);
            process.exit(ExitStatus.Failure);
          }
        });
    } catch (err) {     
        logger.error(`App existed with error: ${err}`);
        process.exit(ExitStatus.Failure);
    }
  })();
  