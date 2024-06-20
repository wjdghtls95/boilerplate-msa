import { exec } from 'shelljs';
import {
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
  createWriteStream,
} from 'fs';

const DATASOURCE_PATH =
  './libs/common/src/databases/typeorm/migrations/datasource';

/**
 * sql 파일 생성
 */
export const generateSql = async (): Promise<void> => {
  // 데이터 소스 파일 읽기
  const dataSources = readdirSync(DATASOURCE_PATH);

  // 마이그레이션 sql 폴더 생성
  const migrationDirectory = `sql`;
  if (!existsSync(migrationDirectory)) {
    mkdirSync(migrationDirectory);
  }

  // 생성 날짜
  const now = new Date();
  const today = `${now.getFullYear()}-${formatWithLeadingZero(
    now.getMonth() + 1,
  )}-${formatWithLeadingZero(now.getDate())}-${formatWithLeadingZero(
    now.getHours(),
  )}:${formatWithLeadingZero(now.getMinutes())}:${formatWithLeadingZero(
    now.getSeconds(),
  )}`;

  // // 생성 날짜 폴더 생성
  const todayDirectory = `${migrationDirectory}/${today}`;
  mkdirSync(todayDirectory);

  // sql 파일 생성 및 replace
  for (const dataSource of dataSources) {
    const databaseName = dataSource.split('.')[0];
    const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d ${DATASOURCE_PATH}/${dataSource} migration:run > ${todayDirectory}/${databaseName}.sql`;
    exec(command);

    // 생성 된 sql 파일 읽기
    const file = readFileSync(`${todayDirectory}/${databaseName}.sql`, 'utf-8');

    const lines = file
      .split('\n')
      .filter((line) => line.includes('query: '))
      .map((line) => line.replaceAll('query: ', ''));

    const fsStream = createWriteStream(`${todayDirectory}/${databaseName}.sql`);

    for (const line of lines) {
      if (line.includes(' -- PARAMETERS: ')) {
        fsStream.write(`${replacePlaceholders(line)};\n`);
      } else {
        fsStream.write(`${line};\n`);
      }
    }

    fsStream.close();
  }
};

/**
 * 날짜 파싱 함수
 */
const formatWithLeadingZero = (num: number): string =>
  num.toString().padStart(2, '0');

/**
 * 마이그레이션 query replace
 */
const replacePlaceholders = (query: string): string => {
  // Extract the parameters from the comment
  const paramPattern = /-- PARAMETERS: \[(.*?)\]/;
  const match = query.match(paramPattern);

  if (!match) {
    throw new Error('No parameters found in the query.');
  }

  // Parse the parameters
  const params = JSON.parse(`[${match[1]}]`);

  // Replace placeholders with actual values
  let replacedQuery = query.replace(/\?\s*,\s*\?/g, () => {
    const timestamp = params.shift();
    const name = params.shift();
    return `${timestamp}, "${name}"`;
  });

  // Remove the comment part
  replacedQuery = replacedQuery.replace(paramPattern, '').trim();

  return replacedQuery;
};

generateSql().then();
