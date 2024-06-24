// MarvelCharacter.ts
export default interface MarvelCharacter {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    resourceURI: string;
    comics: {
        available: number;
    };
    series: {
        available: number;
    };
    stories: {
        available: number;
    };
    events: {
        available: number;
    };
}