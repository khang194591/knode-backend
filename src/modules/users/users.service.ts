import { Member, Organization, Permission, Role, User } from '@/entities';
import { CommonRole } from '@/modules/roles/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly datasource: DataSource,
  ) {}

  async create({ email, hashedPassword }: CreateUserDto): Promise<User> {
    await this.datasource.transaction(async (entityManager) => {
      const [user, org] = await Promise.all([
        entityManager.save(User, { email, password: hashedPassword }),
        entityManager.save(Organization, { name: 'My team' }),
      ]);

      const adminPermission = await entityManager.findOneByOrFail(Permission, {
        name: 'admin',
      });

      const [adminRole, userRole] = await entityManager.save(Role, [
        {
          name: CommonRole.Admin,
          organizationId: org.id,
          permissions: [adminPermission],
        },
        {
          name: CommonRole.User,
          organizationId: org.id,
          permissions: [],
        },
      ]);

      await Promise.all([
        entityManager.update(Organization, org.id, {
          defaultRoleId: userRole.id,
        }),
        entityManager.save(Member, {
          userId: user.id,
          roleId: adminRole.id,
          organizationId: org.id,
        }),
      ]);
    });

    return this.findUserWithPermissionByEmail(email);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserWithPermissionByEmail(email: string, organizationId?: string) {
    const qb = this.userRepository.createQueryBuilder('user');

    if (organizationId) {
      qb.leftJoinAndMapMany(
        'user.profiles',
        Member,
        'profiles',
        'profiles.organizationId = :organizationId AND profiles.userId = user.id',
        { organizationId },
      );
    } else {
      qb.leftJoinAndMapMany(
        'user.profiles',
        Member,
        'profiles',
        'profiles.userId = user.id',
      );
    }

    qb.leftJoinAndMapOne(
      'profiles.role',
      Role,
      'role',
      'profiles.roleId = role.id',
    ).where({ email });

    const user = await qb.getOneOrFail();

    const role = await this.roleRepository.findOneOrFail({
      where: { id: user.profiles[0].roleId, organizationId },
      relations: {
        permissions: true,
      },
    });

    user.profiles[0].role = role;

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
