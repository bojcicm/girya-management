export class Member {
    _id: string;
    name: string;
    phoneNumber: string;
    membershipSubscription: string;
    subscriptionPayments: PaidSubscription[];
    isActive: boolean = true;

    constructor() {
    }

    get lastSubscriptionStatus(): PaidSubscription {
        if (!this.subscriptionPayments)
            return null;
        return this.subscriptionPayments[0];
    }
}

export class PaidSubscription {
    subscriptionDate: Date;
    isPaid: boolean = false;
    paidInAdvance: number = 0;

    constructor() {
    }
}
