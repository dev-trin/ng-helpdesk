export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email:string;
}

export class Group {
	_id: string;
	group: string;
	department: string;
}

export class Location{
    _id: string;
    name: string;
}

export class Equipment {
    _id: string;
    name: string;
}

export class Supplier {
    _id: string;
    name: string;
    address: string;
    email: string;
    tel: string;
    fax: string;
    contact: string;
    district: string;
    subdistrict: string;
    province: string;
    zipcode: number;
    note: string;
}