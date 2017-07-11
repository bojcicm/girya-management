export class Member {
    id: number;
    name: string;
    phoneNumber: string;

    constructor(
        id: number,
        name: string,
        phoneNumber: string
    ) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    /**
     * create the hero from the doc
     * @return {Member}     [description]
     */
    static fromDoc(doc): Member {
        const member = new Member(
            parseInt(doc.get('id')),
            doc.get('name'),
            doc.get('phoneNumber')
        );
        return member;
    }
}
