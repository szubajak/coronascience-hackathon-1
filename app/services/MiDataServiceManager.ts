import Config from 'react-native-config';

class MiDataServiceManager {
    private clientId: string = Config.CLIENT_ID;
    private host: string = Config.HOST;
    private redirect_uri: string = Config.REDIRECT_URL;
    private accessToken: string | undefined = undefined;
    private accessTokenExpirationDate: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;

    public setAuthToken(accessToken: string, accessTokenExpirationDate: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.accessTokenExpirationDate = accessTokenExpirationDate;
        this.refreshToken = refreshToken;
    }

    public async fetch(endpoint: string, method = 'GET', body = undefined) {

        if (this.accessToken === undefined) {
            return Promise.reject(new Error('Can\'t fetch when no user logged in first.'));
        }
    
        return fetch( `${this.host}${endpoint}`, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accessToken
            },
            body: body
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.text().then(responseText => {
                    return Promise.resolve(responseText);
                }).catch(_e => {return Promise.resolve(''); });
            } else {
                return Promise.reject(response);
            }
        }
        ).catch((e => {
            throw (e);
        }));
    }
}

export interface MiDataBundle {
    entry: Array<any>;
    id: string;
    link: Array<any>;
    meta: any;
    resourceType: string;
    total: number;
    type: string;
}

export default new MiDataServiceManager;
  