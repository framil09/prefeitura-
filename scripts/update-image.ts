import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Update notícias with the old image
  const updatedNoticias = await prisma.noticia.updateMany({
    where: {
      imagemCapa: {
        contains: 'kWCoXWkowYE'
      }
    },
    data: {
      imagemCapa: 'https://i.ytimg.com/vi/wNNsUwN5WpI/maxresdefault.jpg'
    }
  });
  console.log('Notícias atualizadas:', updatedNoticias.count);

  // Update mídias with the old image
  const updatedMidias = await prisma.midia.updateMany({
    where: {
      url: {
        contains: 'kWCoXWkowYE'
      }
    },
    data: {
      url: 'https://i.ytimg.com/vi/wNNsUwN5WpI/maxresdefault.jpg',
      thumbnail: 'https://i.ytimg.com/vi/wNNsUwN5WpI/maxresdefault.jpg'
    }
  });
  console.log('Mídias atualizadas:', updatedMidias.count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
