import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import OpenApi from 'openapi-typescript';
import { join } from 'path';
import { promises as fs } from 'fs';

export async function attachDocumentation(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Toys exchange')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // @ts-expect-error
  const types = await OpenApi(document);

  writeTypesToFrontendApp(types);
  SwaggerModule.setup('api', app, document);
}

async function writeTypesToFrontendApp(types: string) {
  const typesFileLocation = join(
    __dirname,
    '../../../frontend/src/shared/APIs/types.ts',
  );

  try {
    await fs.writeFile(typesFileLocation, types, 'utf8');
  } catch (error) {
    console.error('Types for frontend were not generated');
    console.error(error);
  }
}
