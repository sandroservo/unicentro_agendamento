const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/b9a9c889-a0b1-40f2-a1ab-36daaf6280e1-1d.jpg",
      "https://utfs.io/f/c1eb687b-29ca-4174-b1fb-6a3b9dfd4031-1e.jpg",
      "https://utfs.io/f/cfcc982f-0e3a-47f0-9bf2-4a856b9bbdab-1f.jpg",
      "https://utfs.io/f/489e9d48-2319-4759-96c0-869e2ef9a434-1g.jpg",
      "https://utfs.io/f/70e6181a-f1f2-4e39-a982-fdb876bcce8e-1h.jpg",
      "https://utfs.io/f/ce13915d-37ba-4b4f-8107-b3f203f09cd0-1i.jpg",
      "https://utfs.io/f/d18564a0-e19b-4880-9836-2ad395d9ac4a-1j.jpg",
      "https://utfs.io/f/3cf142c5-389b-45e0-a55a-d8b483550145-120mh.jpg",
      "https://utfs.io/f/b3a4aaf7-e74a-4a8d-80a4-3dd185076afa-17j.jpg.jpg",

    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "Semiologia e Semiotécnica",
      "Anatomia e Neuroanatomia",
      "Cinesiologia e Cinesioterapia",
      "Informática",
      "Bioquímica",
      "Bioquímica",
      "Ideias",
    ];



    const services = [
      {
        name: "Aula teste",
        description: "Explorando Estudos de Casos ",
        imageUrl: "https://utfs.io/f/b9a9c889-a0b1-40f2-a1ab-36daaf6280e1-1d.jpg",
      },
      {
        name: "Aula teste 2",
        description: "Introdução às Técnicas de Diagnóstico em Saúde .",
        imageUrl: "https://utfs.io/f/c1eb687b-29ca-4174-b1fb-6a3b9dfd4031-1e.jpg",
      },
      {
        name: "Aula teste 3",
        description: "aula tste",
        imageUrl: "https://utfs.io/f/cfcc982f-0e3a-47f0-9bf2-4a856b9bbdab-1f.jpg",
      },
      {
        name: "Aula teste 4",
        description: "aula teste.",
        imageUrl: "https://utfs.io/f/489e9d48-2319-4759-96c0-869e2ef9a434-1g.jpg",
      },
      {
        name: "Aula teste 5",
        description: "aula teste.",
        imageUrl: "https://utfs.io/f/70e6181a-f1f2-4e39-a982-fdb876bcce8e-1h.jpg",
      },
      {
        name: "Aula teste 6",
        description: "aula teste.",
        imageUrl: "https://utfs.io/f/ce13915d-37ba-4b4f-8107-b3f203f09cd0-1i.jpg",
      },
    ];

    // Criar 10 barbearias com nomes e endereços fictícios
    const laboratorys = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const imageUrl = images[i];

      const laboratory = await prisma.laboratory.create({
        data: {
          name,
          imageUrl: imageUrl,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            laboratory: {
              connect: {
                id: laboratory.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      laboratorys.push(laboratory);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as laboratorios:", error);
  }
}

seedDatabase();