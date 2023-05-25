export class LocationType {
    locationTypeId : string;
    locationTypeName : string;
    locationTypePath : string;

    constructor(locationTypeId: string, locationTypeName: string, locationTypePath: string) {
        this.locationTypeId = locationTypeId;
        this.locationTypeName = locationTypeName;
        this.locationTypePath = locationTypePath;
    }
}