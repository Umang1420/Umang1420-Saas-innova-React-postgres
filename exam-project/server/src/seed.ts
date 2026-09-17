import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import type { Repository } from 'typeorm';
import { AppModule } from './app.module.js';
import { Name } from './names/entities/name.entity.js';
import { Users } from './users/user.entity.js';

async function seed() {
	const app = await NestFactory.createApplicationContext(AppModule);
	const userRepository = app.get<Repository<Users>>(getRepositoryToken(Users));
	const nameRepository = app.get<Repository<Name>>(getRepositoryToken(Name));

	try {
		const users = [
			{ username: 'examuser', password: 'Exam@123', role: 'user' },
			{ username: 'examadmin', password: 'Admin@123', role: 'admin' },
		];

		const savedUsers = new Map<string, Users>();
		for (const userData of users) {
			let user = await userRepository.findOneBy({ username: userData.username });
			if (!user) {
				user = await userRepository.save(
					userRepository.create({
						username: userData.username,
						passwordHash: await bcrypt.hash(userData.password, 10),
						role: userData.role,
					}),
				);
				console.log(`Created ${userData.role} user: ${user.username}`);
			} else {
				console.log(`User already exists: ${user.username}`);
			}
			savedUsers.set(userData.username, user);
		}

		const examUser = savedUsers.get('examuser');
		if (!examUser) {
			throw new Error('examuser was not available after seeding users');
		}

		const email = 'examuser@example.com';
		let name = await nameRepository.findOne({
			where: { email },
			relations: { user: true },
		});

		if (!name) {
			name = await nameRepository.save(
				nameRepository.create({
					name: 'Exam User',
					email : email,
					course: 'BCA',
					user: examUser,
				}),
			);
			console.log(`Created name record: ${name.name}`);
		} else {
			console.log(`Name record already exists: ${name.name}`);
		}

		const savedName = await nameRepository.findOneOrFail({
			where: { email },
			relations: { user: true },
		});
		console.log(
			`Seed relation verified: ${savedName.name} belongs to ${savedName.user.username}`,
		);
	} finally {
		await app.close();
	}
}

seed().catch((error: unknown) => {
	console.error('Seed failed', error);
	process.exitCode = 1;
});
