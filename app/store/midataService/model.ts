import Config from 'react-native-config';
import Resource, { ValueCoding } from '../../model/resource/Resource';
import Patient from '../../model/resource/Patient';
import Observation, { CodeableConcept, Coding } from '../../model/resource/Observation';
import UserSession from '../../model/UserSession';

class MiDataServiceStore {
    currentSession: UserSession = new UserSession();

    constructor(miDataServiceStore?: MiDataServiceStore) {
        if (miDataServiceStore) {
            this.currentSession = new UserSession(miDataServiceStore.currentSession);
        }
    }
    /**
     * This function modify the store. Do not run it outside of a reducer.
     * @param accessToken 
     * @param accessTokenExpirationDate 
     * @param refreshToken 
     */
    public authenticateUser(accessToken: string, accessTokenExpirationDate: string, refreshToken: string) {
        this.currentSession.updateToken(accessToken, accessTokenExpirationDate, refreshToken);
    }

    /**
     * This function modify the store. Do not run it outside of a reducer.
     */
    public logoutUser() {
        this.currentSession.resetToken();
    }

    public isAuthenticated() {
        return this.currentSession.isTokenValid(); // TODO check expiration date of the token ;-)
    }

    public async fetch(endpoint: string, method = 'GET', body: string|undefined = undefined) {

        if (this.currentSession.getAccessToken() === undefined) {
            return Promise.reject(new Error('Can\'t fetch when no user logged in first.'));
        }
    
        return fetch( `${Config.HOST}${endpoint}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.currentSession.getAccessToken()
            },
            body: body
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.text().then(responseText => {
                    //return Promise.resolve(responseText);
                    let bundle = JSON.parse(responseText) as MIDATABundle;
                    return Promise.resolve(this.fhirBundleParser(bundle));
                }).catch(_e => {return Promise.resolve(''); });
            } else {
                return Promise.reject(response);
            }
        }
        ).catch((e => {
            throw (e);
        }));
    }

    private fhirBundleParser(bundle: MIDATABundle) : Resource[]{
        var resources : Resource[] = [];
        if (bundle.total > 0) {
            bundle.entry.forEach(entry => {
                switch(entry.resource.resourceType){
                    case 'Patient':  
                        resources.push( this.fhirPatientParser(entry.resource) );
                        break;

                    case 'Observation':  
                        resources.push( this.fhirObservationParser(entry.resource) );
                        break;

                    case 'Composition':  
                        resources.push( this.fhirObservationParser(entry.resource) );
                        break;
                }
            });
        } 
        return resources;
    }

    private fhirPatientParser(fhirResource : any) : Resource{
        return  new Patient( fhirResource.id, fhirResource.gender, fhirResource.name[0].family, fhirResource.name[0].given[0], fhirResource.birthDate );
    }

    private fhirObservationParser(fhirResource : any) : Resource{
        let vc : ValueCoding = new ValueCoding();
        vc.code = fhirResource.code.coding[0].code;
        vc.display = fhirResource.code.coding[0].display;
        vc.system = fhirResource.code.coding[0].system;

        let coding : Coding = new Coding();
        coding.coding.push(vc);

        let code : CodeableConcept = new CodeableConcept();
        code.coding.push(coding);

        return new Observation(fhirResource.id, fhirResource.status, code );
    }
}

// TODO : rename or refactor this...
export interface MIDATABundle {
    entry: Array<any>;
    id: string;
    link: Array<any>;
    meta: any;
    resourceType: string;
    total: number;
    type: string;
}

export default MiDataServiceStore;
  