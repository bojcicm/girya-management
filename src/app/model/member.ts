export class Member {
    _id: number;
    name: string;
    phoneNumber: string;
    membershipSubscription: string;
    subscriptionPayments: PaidSubscription[];
    isActive: boolean;

    constructor() {
    }
}

export class PaidSubscription {
    forMonth: number;
    datePaid: Date;
    dateExpectedToPay: Date;
    isPaid: boolean = false;

    constructor() {
    }
}
