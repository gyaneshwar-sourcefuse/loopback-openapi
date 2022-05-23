import {juggler} from '@loopback/repository';
import {config} from '../../../datasources';

export const testdb: juggler.DataSource = new juggler.DataSource(config);
