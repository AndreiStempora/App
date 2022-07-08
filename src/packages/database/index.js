import DB from "./features/database";
import { dealershipsService } from "./features/services/dealershipsService";
import { logService } from "./features/services/logService";
import { vehiclesService } from "./features/services/vehiclesService";
import { tests } from "./features/databaseTests";
import { imagesService } from "./features/services/imagesService";
import { hotspotsService } from "./features/services/hotspotsService";
import useDbRequest from "./features/utils/databaseOperationsHook";
import DealershipSelector from "./components/dealershipSelector/DealershipSelector";


export { DB, dealershipsService, logService, vehiclesService, tests, imagesService, hotspotsService, useDbRequest, DealershipSelector };