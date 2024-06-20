import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716534180013 implements MigrationInterface {
  name = 'Migration1716534180013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`platform\` varchar(255) NOT NULL COMMENT '플랫폼 타입', \`provider_id\` varchar(255) NOT NULL COMMENT '플랫폼 식별자 아이디', \`platform_id\` varchar(255) NULL COMMENT '플랫폼 계정 아이디 - email or phone', \`dsp_nid\` varchar(255) NULL COMMENT 'dsp nid', \`eh_nid\` varchar(255) NULL COMMENT 'eh nid', \`address\` varchar(255) NULL COMMENT '지갑 주소', \`dsp_nick_name\` varchar(255) NULL COMMENT 'dsp 닉네임', \`refresh_token\` varchar(255) NULL COMMENT 'pfSessionToken 갱신을 위한 토큰', \`withdrew_at\` datetime NULL COMMENT '탈퇴 시간', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4c8d991a1dfe6885d895d20d36\` (\`dsp_nid\`), UNIQUE INDEX \`IDX_ece8ce34c6a8cdc49aab31baf4\` (\`eh_nid\`), UNIQUE INDEX \`IDX_e763cd14184b3d67d3751d8a26\` (\`provider_id\`, \`address\`), UNIQUE INDEX \`IDX_db9867c48b9d0a670a31c6d7d9\` (\`platform\`, \`provider_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`purchase\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '아이디', \`nid\` varchar(255) NULL COMMENT 'nid(eh)', \`gnid\` varchar(255) NOT NULL COMMENT 'global nid', \`order_state\` int NOT NULL COMMENT '구매 상태', \`app_store_cd\` int NOT NULL COMMENT '앱 스토어 코드', \`transaction_id\` varchar(255) NULL COMMENT '구매 트랜잭션 아이디', \`order_id\` varchar(255) NULL COMMENT '플랫폼 구매 정보 아이디', \`product_id\` varchar(255) NOT NULL COMMENT '물품 아이디', \`purchase_state\` int NULL COMMENT 'IDP 구매 상태 -  0: 구매, 1: 취소, 2: 대기', \`purchase_time\` varchar(255) NULL COMMENT '구매 시간, millis', \`price\` int NULL COMMENT '물품 가격', \`user_ip\` varchar(255) NULL COMMENT '유저 아이피', \`app_version\` varchar(255) NULL COMMENT '앱 버전', \`os\` varchar(255) NULL COMMENT '접속 플랫폼(android, ios, window..)', \`location\` varchar(255) NULL COMMENT '접속 위치', \`server_id\` varchar(255) NULL COMMENT 'user 게임서버 아이디', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b6bc10f7e8c3971acc15865b08\` (\`nid\`), UNIQUE INDEX \`IDX_4bd2c5fafafe809ad10e01cb35\` (\`transaction_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_4bd2c5fafafe809ad10e01cb35\` ON \`purchase\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b6bc10f7e8c3971acc15865b08\` ON \`purchase\``,
    );
    await queryRunner.query(`DROP TABLE \`purchase\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_db9867c48b9d0a670a31c6d7d9\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e763cd14184b3d67d3751d8a26\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ece8ce34c6a8cdc49aab31baf4\` ON \`account\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4c8d991a1dfe6885d895d20d36\` ON \`account\``,
    );
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
