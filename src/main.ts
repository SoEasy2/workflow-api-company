import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from './exceptions/rpc-exception.filter';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
          clientId: 'comp-service',
        },
        consumer: {
          groupId: `company-consumer-${uuidv4()}`,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}
bootstrap().then(() => {
  console.log('Company service is running');
});
