export class LocationType {
    locationTypeId : string;
    locationTypeName : string;
    locationTypePath : string;
    accessToken: string;

    constructor(locationTypeId: string, locationTypeName: string, locationTypePath: string, accessToken: string) {
        this.locationTypeId = locationTypeId;
        this.locationTypeName = locationTypeName;
        this.locationTypePath = locationTypePath;
        this.accessToken = accessToken;
    }
}