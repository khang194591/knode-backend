import { seedConfig } from "ormconfig";
import { DataSource } from "typeorm";

export default new DataSource(seedConfig)