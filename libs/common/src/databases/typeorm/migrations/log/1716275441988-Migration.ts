import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716275441988 implements MigrationInterface {
  name = 'Migration1716275441988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`batch_log\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`type\` int NOT NULL COMMENT '배치 종류', \`message\` varchar(255) NOT NULL COMMENT '배치 상황', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`purchase_log\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`contents\` varchar(255) NOT NULL COMMENT '컨텐츠', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`purchase_log\``);
    await queryRunner.query(`DROP TABLE \`batch_log\``);
  }
}
