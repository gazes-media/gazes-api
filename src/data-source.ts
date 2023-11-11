import "reflect-metadata";
import { DataSource } from "typeorm";
import * as Entity from "./entity/Entity";

let entities = Object.values(Entity);
export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "149.91.80.94",
    port: 3306,
    username: "gaze",
    password: "FK3sPh8BBHcCRp2T",
    database: "gaze",
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
});
