
class UrlHelper {

    static encodeData(data: Map<string, string>): string {
        return Object.keys(data).map(function(key: string) {
            const dataAny: any = data; // prevent TSX bad error
            return [key, dataAny[key]].map(encodeURIComponent).join("=");
        }).join("&");
    } 
}

export default UrlHelper;