import UserLocation, { City, LOCATION_TYPE_PRINCIPAL} from './UserLocation';
import UserName from './UserName';
import IClonable from './IClonable';


export default class UserProfile implements IClonable<UserProfile> {
    
    id: string;
    name: UserName;
    address: Array<City>;
    locations: Array<UserLocation> = [];
    versionId: string;

    constructor(id: string, family: string, given: string[], address: Array<City>, versionId: string) {
        this.id = id;
        this.address = address;
        this.versionId = versionId;
        this.name = new UserName(family, given);
    }

    clone(): UserProfile {
        const clone = new UserProfile( this.id, this.name.family, this.name.given, this.address, this.versionId);
        clone.setLocations(this.locations);
        return clone
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

}