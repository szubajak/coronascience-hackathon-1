import MiDataServiceStore, { MIDATABundle } from "../store/midataService/model";
import AbstractObservationService from "./ObservationService";
import moment from 'moment';
import UserProfile from "../model/UserProfile";
import { City } from "../model/UserLocation";
import Patient from "../model/resource/Patient";
import UserName from "../model/UserName";


class UserProfileService {
    readonly USERPROFILE_ENDPOINT = "/fhir/Patient";

    private miDataServiceStore: MiDataServiceStore;

    constructor(midataService: MiDataServiceStore) {
        this.miDataServiceStore = midataService;
    }

    async getUserProfile(): Promise<UserProfile> {
        try {
            const response = await this.miDataServiceStore.fetch(this.USERPROFILE_ENDPOINT, 'GET');
            let bundle = response[0] as Patient;
            var userProfile = this.parseUserProfileBundle(bundle);
            if(userProfile !== undefined) {
                return userProfile;
            } else {
                throw new Error('No user returned');
            }   
        } catch (error) {
            const message = "UserProfileService : error while getting userProfile. " + error;
            return Promise.reject({message: message, error});
        }
    }

    private parseUserProfileBundle(bundle: Patient) {
        var user = undefined;
            let family = bundle.name[0].family;
            let given = bundle.name[0].given;
            let id = bundle.identifier.value;
            let address = this.parseAdress(bundle.address);
            let name = new UserName(family, given);
            user = new UserProfile({id, name});
        return user;
    }

    private parseAdress(rawAddress: any[]): City[] {
        return rawAddress.map(rawAddress => {
            const city: City = {
                name: rawAddress.city,
                nipCode: rawAddress.postalCode,
            }
            return city;
        });
    }
    

}

export default UserProfileService;
  