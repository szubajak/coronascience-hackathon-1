import MiDataServiceManager, { MiDataBundle } from "./MiDataServiceManager";
import UrlHelper from "../helpers/UrlHelpers";

abstract class AbstractObservationService {
    readonly OBSERVATION_ENDPOINT = "/fhir/Observation";
    readonly OBSERVATION_UPDATE_ENDPOINT = "/fhir";

    protected abstract getObservationCode(): string;

    protected async getObservation(params: Map<string, string>) {
        try {
            const allParams = {
                code: this.getObservationCode(),
                ...params
            }
            const paramsUrl = UrlHelper.encodeData(allParams);
            const url = this.OBSERVATION_ENDPOINT + '?' + paramsUrl;
            const response = await MiDataServiceManager.fetch(url, 'GET');
            let bundle = JSON.parse(response) as MiDataBundle;
            return bundle;
        } catch (error) {
            const message = "ObservationService : error while getting observations. " + error;
            return Promise.reject({message: message, error});
        }
    }

    protected async updateObservation(observationBody: string) {
        try {
            const response = await MiDataServiceManager.fetch(this.OBSERVATION_UPDATE_ENDPOINT, 'POST', observationBody);
            let responseJSON = JSON.parse(response);
            return responseJSON;
        } catch(error) {
            const message = "ObservationService : error while updating observations. " + error;
            return Promise.reject({message: message, error});
        }
    }
}

export default AbstractObservationService;
  