export class Artist {
    artistId: string;
    artistName: string;
    artistImagePath: string;
    programId: string[];
    accessToken: string;

    constructor(artistId: string, artistName: string, artistImagePath: string,
        programId: string[], accessToken: string) {
        this.artistId = artistId;
        this.artistName = artistName;
        this.artistImagePath = artistImagePath;
        this.programId = programId;
        this.accessToken = accessToken;
    }
}