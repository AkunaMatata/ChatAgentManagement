import { SchemaMapInterface, SchemaInterface } from './url-schema';

export class SchemaUtility {
    public static compileUrlSchema(schemaConfig: SchemaInterface): SchemaMapInterface {
        let schemaMap = {};
        _.forOwn(schemaConfig, (value, key) => schemaMap[key] = _.template(value));
        return schemaMap;
    }
}