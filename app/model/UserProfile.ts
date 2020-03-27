import UserLocation, { City, LOCATION_TYPE_PRINCIPAL} from './UserLocation';
import UserName from './UserName';

export default class UserProfile {
  
    id: string | undefined = undefined;
    name: UserName | undefined = undefined
    address: Array<City> | undefined = undefined;
    locations: Array<UserLocation> = [];
    versionId: string | undefined = undefined;

    constructor(userProfile?: Partial<UserProfile>) {
        if(userProfile) {
            this.updateProfile(userProfile);
        }
    }

    updateProfile(attributs: Partial<UserProfile>) {
        if(attributs.id != undefined) this.id = attributs.id;
        if(attributs.address != undefined) this.address = attributs.address;
        if(attributs.versionId != undefined) this.versionId = attributs.versionId;
        if(attributs.name != undefined) this.name = attributs.name.clone();
        if(attributs.locations != undefined) this.setLocations(attributs.locations);
    }

    isUpToDate() {
        return this.id != undefined;
    }

    setAddress(address: Array<City>) {
        this.address = [...address];
        if (address.length > 0) {
            let homeLocation: UserLocation | undefined = this.getHomeLocation();
            if (homeLocation !== undefined && homeLocation.nipCode === undefined && address[0].nipCode !== undefined) {
                homeLocation.nipCode = address[0].nipCode;
                homeLocation.name = address[0].name;
            }
        }
    }

    getHomeLocation(): UserLocation | undefined {
        let homeLocation;
        if (this.locations) {
            this.locations.forEach(location => {
                if (location.type != undefined && location.type.key === LOCATION_TYPE_PRINCIPAL.key) {
                    homeLocation = location;
                }
            });
        }
        return homeLocation;
    }

    setLocations(locations: Array<any>) {
        this.locations = new Array<UserLocation>();
        if (locations) {
            locations.forEach(element => {
                let location = new UserLocation(element);
                this.locations.push(location);
            });
        }
    }

    getFullName() {
        return this.name ? this.name.getFullName() : "";
    }

}