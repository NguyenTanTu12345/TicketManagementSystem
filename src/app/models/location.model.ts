export class Location {
    locationId: string;
    locationName: string;
    locationSummary: string;
    locationContent: string;
    locationImagePath: string;
    locationTypeId: string;
    accessToken: string;

    constructor(locationId: string, lolocationName: string, locationSummary: string,
        locationContent: string, locationImagePath: string, locationTypeId: string,
        accessToken: string) {
        this.locationId = locationId;
        this.locationName = lolocationName;
        this.locationSummary = locationSummary;
        this.locationContent = locationContent;
        this.locationImagePath = locationImagePath;
        this.locationTypeId = locationTypeId;
        this.accessToken = accessToken;
    }
}