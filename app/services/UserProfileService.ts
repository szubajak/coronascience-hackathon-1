import MiDataServiceManager, { MiDataBundle } from "./MiDataServiceManager";
import AbstractObservationService from "./ObservationService";
import moment from 'moment';
import UserProfile from "../model/UserProfile";
import { City } from "../model/UserLocation";


class UserProfileService {
    readonly USERPROFILE_ENDPOINT = "/fhir/Patient";

    async getUserProfile(): Promise<UserProfile> {
        try {
            const response = await MiDataServiceManager.fetch(this.USERPROFILE_ENDPOINT, 'GET');
            let bundle = JSON.parse(response) as MiDataBundle;
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

    private parseUserProfileBundle(bundle: MiDataBundle) {
        var user = undefined;
        if (bundle.total > 0) {
            let resource = bundle.entry[0].resource;
            let family = resource.name[0].family;
            let given = resource.name[0].given;
            let id = resource.id;
            let address = this.parseAdress(resource.address);
            let versionId = resource.meta.versionId;
            user = new UserProfile(id, family, given, address, versionId);
        } 
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
  