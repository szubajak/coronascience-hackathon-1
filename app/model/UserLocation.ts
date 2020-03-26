import cities from '../../resources/static/cities.json';
import { getCurrentLanguage } from '../locales';

interface LocationType {
    key: number;
    display: string;
}

export interface City {
    name: string;
    nipCode: string;
}

export const LOCATION_TYPE_PRINCIPAL: LocationType = {key: 0, display: 'Principal Location'};
export const LOCATION_TYPE_WORK: LocationType = {key: 1, display: 'Work location'};
export const LOCATION_TYPE_GPS: LocationType = {key: 2, display: 'Current location'};
export const LOCATION_TYPE_EXTRA: LocationType = {key: 3, display: 'Extra location '};
export const LOCATION_TYPE_ADD: LocationType = {key: 4, display: ''};


export default class UserLocation {
    type: LocationType | undefined;
    name: string | undefined;
    nipCode: string | undefined;
    id: number | undefined;
    version: string | undefined;

    constructor(userLocation?: UserLocation) {
        if (userLocation) {
            Object.assign(this, userLocation);
        } else {
            this.type = undefined;
            this.id = undefined;
            this.version = '0';
            this.resetLocation();
        }
    }

    resetLocation() {
        this.name = '';
        this.nipCode = '';
    }

    isLocationReset() {
        return (!this.name || !this.nipCode || (this.name === '' && this.nipCode === ''));
    }

    setLocationByCoordinates(latitude: number, longitude: number) {
        let minDistance = Number.MAX_VALUE;
        let selectedCity = undefined;
        cities.forEach((city: any) => {
            const distance = Math.abs((city.E - longitude) * (city.N - latitude));
            if (!minDistance || distance < minDistance) {
                minDistance = distance;
                selectedCity = city;
            }
        });
        const foundCity = this.getUserLocationFromJson(selectedCity);
        this.name = foundCity.name;
        this.nipCode = foundCity.nipCode;
        this.type = LOCATION_TYPE_GPS;
    }

    getUserLocationFromJson(cityJson: any): City {
        let cityName = "";
        let cityNip = cityJson.PLZ;
        const currentLocale: string = getCurrentLanguage().toUpperCase();
        if (!cityJson[currentLocale] || cityJson[currentLocale] === '') {
            cityName = cityJson.Ortschaftsname;
        } else {
            cityName = cityJson[currentLocale];
        }
        return {
            name: cityName,
            nipCode: cityNip
        };
    }

}