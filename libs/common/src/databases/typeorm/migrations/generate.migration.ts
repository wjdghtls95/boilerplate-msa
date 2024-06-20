import { exec } from 'shelljs';
import { readdirSync } from 'fs';

const DATASOURCE_PATH =
  './libs/common/src/databases/typeorm/migrations/datasource';

const generateMigration = (): void => {
  const dataSources = readdirSync(DATASOURCE_PATH);

  for (const dataSource of dataSources) {
    const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ${DATASOURCE_PATH}/${dataSource} migration:generate ./libs/common/src/databases/typeorm/migrations/${dataSource.split('.')[0]}/Migration`;
    exec(command);
  }
};

generateMigration();
