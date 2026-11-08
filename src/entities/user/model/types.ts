export type Role = 'USER';

export type User = {
	id: string;
	roles: Role[];
	name: string;
	email: string;
	phone: string;
	avatarPath: string;
	about: string;
};
