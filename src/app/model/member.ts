export class Member {
    _id: number;
    name: string;
    phoneNumber: string;
    membershipSubscription: string;
    subscriptionPayments: PaidSubscription[];
    isActive: boolean = true;

    constructor() {
    }
}

export class PaidSubscription {
    subscriptionDate: Date;
    isPaid: boolean = false;

    constructor() {
    }
}
