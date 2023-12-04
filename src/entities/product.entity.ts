// import { CoreEntity } from '@base/base.entity';
// import { Column, Entity, Unique } from 'typeorm';

// @Entity('products')
// export class User extends CoreEntity {
//   @Unique('product-name', [])
//   name: string;

//   @Column({ default: 0 })
//   price: number;

//   @Unique('user-email', [])
//   @Column({ nullable: true })
//   email: string;

//   @Unique('user-username', [])
//   @Column({ nullable: true })
//   username: string;

//   @Column({ nullable: false })
//   password: string;

//   @Column() role: number;

//   @Unique('user-phone', [])
//   @Column({ nullable: true })
//   phone: string;

//   @Column({ nullable: true })
//   image: string;

//   @Column({ nullable: true })
//   dateOfBirth: { type: Date };

//   @Column({ nullable: true })
//   gender: { type: boolean };

//   @Column({ nullable: true })
//   address: { type: string };

//   @Column({ nullable: true })
//   salary: { type: number };

//   constructor(data: unknown) {
//     super();
//     this._transform(data);
//   }
// }
