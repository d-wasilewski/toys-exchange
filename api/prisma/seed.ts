import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = process.env.HASHED_SEED_PASS;

  console.log('Seeding admins...');

  await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'Admin',
      password: hashedPassword,
      phoneNumber: '675678936',
      role: 'ADMIN',
      confirmed: true,
    },
  });

  console.log('Seeding users...');

  const userKornel = await prisma.user.create({
    data: {
      email: 'kornel@email.com',
      name: 'Kornel',
      password: hashedPassword,
      phoneNumber: '234123499',
      confirmed: true,
    },
  });

  const userAgata = await prisma.user.create({
    data: {
      email: 'agata@email.com',
      name: 'Agata',
      password: hashedPassword,
      phoneNumber: '234123499',
      confirmed: true,
    },
  });

  const userDamian = await prisma.user.create({
    data: {
      email: 'damian@email.com',
      name: 'Damian',
      password: hashedPassword,
      phoneNumber: '234123499',
      confirmed: true,
    },
  });

  const userMaria = await prisma.user.create({
    data: {
      email: 'maria@email.com',
      name: 'Maria',
      password: hashedPassword,
      phoneNumber: '234123499',
      confirmed: true,
    },
  });

  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        email: `example${i}@email.com`,
        name: `ExampleUser${i}`,
        password: hashedPassword,
        phoneNumber: `2341234${i}${i}`,
        confirmed: true,
      },
    });
  }

  console.log('Seeding toys...');

  await prisma.toy.create({
    data: {
      name: 'Puzzle z koniem',
      category: 'PUZZLE',
      imgUrl:
        'https://a.allegroimg.com/original/11132c/ec15cb9f4dd5a42ec5c6a424b6fd/PUZZLE-KONIE-KON-GALOP-W-POPOLUDNIOWYM-SLONCU-500E',
      description: 'Zawiera wszystkie elementy',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Puzzle używane',
      category: 'PUZZLE',
      imgUrl:
        'https://ireland.apollo.olxcdn.com/v1/files/x0bv5zpcn2mu-PL/image;s=644x461;r=90',
      description: '1000 elementów',
      ownerId: userDamian.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Puzzle 1000',
      category: 'PUZZLE',
      imgUrl:
        'https://ireland.apollo.olxcdn.com/v1/files/bbhka39zpp2u3-PL/image;s=644x461',
      description: 'Puzzle pokazujące anglię',
      ownerId: userDamian.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Czarny McQueen',
      category: 'RADIO_CONTROLLED',
      imgUrl:
        'https://cobi.pl/gfx/cobi2/_thumbs/pl/sklep_oferta/10366/zygzak-mcqueen-carbon-zdalnie-sterowany-cars-3,dickie-cars-2-auta-zygzak-mcquee_1963_1200,k3djZatnlKiRlOvRlmRk-.jpg',

      description: 'Samochodzik z pilotem',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Niebiesko-czarny samochod',
      category: 'RADIO_CONTROLLED',
      imgUrl:
        'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/38/961578/1.jpg?7547',
      description: 'Samochód sterowany zdalnie',
      ownerId: userDamian.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Lalka barbie',
      category: 'DOLLS',
      imgUrl:
        'https://korob.pl/pol_pl_Lalka-Barbie-na-wozku-inwalidzkim-GRB93-325961_1.jpg',
      description: 'Na wózku inwalidzkim',
      ownerId: userAgata.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Lego star wars',
      category: 'LEGO',
      imgUrl:
        'https://i2.offers.gallery/p-74-3f-743fdd6d2014e07d0de279a5f8c9f1d5400x400/75272-myslwiec-tie-sithowtm-sith-tie-fighter-klocki-lego-star-wars400x400.jpg',
      description: 'Myślwiec Tie Sithowtm',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Zestaw do kuchni',
      category: 'FOOD_RELATED',
      imgUrl:
        'https://ae01.alicdn.com/kf/H35c22045d77f44e782c071678355e4e1w/Fruit-Vegetable-Toy-Cutting-Kitchen-Fruit-Vegetable-Toy-Sets-Pretend-Play-Kitchen-Cut-Fruit-Toy-Plastic.jpg',
      description: 'Owoce i warzywa z koszykiem',
      ownerId: userMaria.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Lego avatar',
      category: 'LEGO',
      imgUrl:
        'https://zabawki-nino.pl/wp-content/uploads/2023/01/klocki-lego-Avatar-75578-Dom-na-rafie-klanu-Metkayina.jpg',
      description: 'Dom na rafie klanu Metkayina',
      ownerId: userDamian.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Figurki postaci',
      category: 'FIGURES',
      imgUrl:
        'https://thumbs.img-sprzedajemy.pl/1000x901c/90/10/18/zabawki-figurki-postacie-z-bajek-olkusz-557497439.jpg',
      description: 'Zabawki z kinderniespodzianek',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: '4 zabawki',
      category: 'FIGURES',
      imgUrl:
        'https://korob.pl/pol_pl_Figurki-Toy-Story-4-5pack-Mattel-GDP75-267820_1.jpg',
      description: 'Zabawki z filmu Toy Story',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Firgurki psów',
      category: 'FIGURES',
      imgUrl:
        'https://ireland.apollo.olxcdn.com/v1/files/3zf9z4wf8l712-PL/image;s=644x461',
      description: 'Pieski z psiego patrolu',
      ownerId: userKornel.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Królewna',
      category: 'DOLLS',
      imgUrl:
        'https://ireland.apollo.olxcdn.com/v1/files/r2o7awkcuej91-PL/image;s=644x461',
      description: 'Lalka w sukience',
      ownerId: userMaria.id,
    },
  });

  await prisma.toy.create({
    data: {
      name: 'Wyścigówka',
      category: 'CARS',
      imgUrl:
        'https://ireland.apollo.olxcdn.com/v1/files/m59hzomvz92d3-PL/image;s=644x461',
      description: 'Z ludzikiem w środku',
      ownerId: userDamian.id,
    },
  });

  console.log('Seeding ratings...');

  await prisma.rating.create({
    data: {
      userId: userKornel.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userKornel.id,
      value: 4,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userKornel.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userKornel.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userDamian.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userDamian.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userDamian.id,
      value: 3,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userAgata.id,
      value: 3,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userAgata.id,
      value: 2,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userAgata.id,
      value: 3,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userMaria.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userMaria.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userMaria.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  await prisma.rating.create({
    data: {
      userId: userMaria.id,
      value: 5,
      receiverOfferId: null,
    },
  });

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
