export class Location {
    locationId: string;
    locationName: string;
    locationSummary: string;
    locationContent: string;
    locationImagePath: string;
    locationTypeID: string | null;

    constructor(locationId: string, lolocationName: string, locationSummary: string, locationContent: string, locationImagePath: string, locationTypeID: string) {
        this.locationId = locationId;
        this.locationName = lolocationName;
        this.locationSummary = locationSummary;
        this.locationContent = locationContent;
        this.locationImagePath = locationImagePath;
        this.locationTypeID = locationTypeID;
    }
}