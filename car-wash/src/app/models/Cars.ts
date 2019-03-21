export class Make {
    id: string;
    name: string;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class Model {
    name: string;
    makeId: string;
    /**
     *
     */
    constructor(name, make_id) {
        this.name = name;
        this.makeId = make_id;
    }
}
