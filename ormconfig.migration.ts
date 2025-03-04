import { migrationConfig } from "ormconfig";
import { DataSource } from "typeorm";

export default new DataSource(migrationConfig)