export interface Photografy {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

export interface ListPhotografy {
    data: Array<Photografy>
}

export interface stateSelector {
    photo: photoList
}

export interface photoList {
    photoList: Array<Photografy>
}