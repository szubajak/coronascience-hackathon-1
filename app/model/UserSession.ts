import IClonable from "./IClonable";

export default class UserSession {
    private accessToken: string | undefined = undefined;
    private accessTokenExpirationDate: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;


    constructor(userSession?: UserSession) {
        if(userSession) {
            this.accessToken = userSession.accessToken;
            this.accessTokenExpirationDate = userSession.accessTokenExpirationDate;
            this.refreshToken = userSession.refreshToken;
        }
    }

    public updateToken(accessToken: string, accessTokenExpirationDate: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.accessTokenExpirationDate = accessTokenExpirationDate;
        this.refreshToken = refreshToken;
    }

    public resetToken() {
        this.accessToken = this.accessTokenExpirationDate = this.refreshToken = undefined;
    }

    isTokenValid() {
        if(this.accessToken === undefined) {
            return false;
        } else if(this.accessTokenExpirationDate) {
            // TODO : check DATE
        }
        return true;
    }

    getAccessToken() {
        return this.accessToken;
    }

}