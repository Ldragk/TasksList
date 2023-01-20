
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

interface ITask {
  title: string;
  description: string;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
  date: string
}

app.use(express.json());
app.use(cors());


async function main() {
  app.post("/create", async (req, res) => {
    const completDate = req.body.limitDay + "/" + req.body.limitMonth + "/" + req.body.limitYear;
    const tasks: ITask = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        limitDay: req.body.limitDay,
        limitMonth: req.body.limitMonth,
        limitYear: req.body.limitYear,
        date: completDate
      }
    });
    return res.status(201).json(tasks);
  });

  app.get("/all", async (req, res) => {
    const tasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.json(tasks);
  });
}

app.get("/tasks/:month/monthTasks", async (req, res) => {
  const month = Number(req.params.month);

  const monthTasks = await prisma.tasks.findMany({
    select: {
      title: true,
      description: true,     
      date: true,
      done: true,
      createdAt: true,
      updatedAt: true,

    },  
    where: {
        limitMonth: month
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(
    monthTasks.map((tasks) => {
      return {
        ...tasks,
        title: tasks.title,
        description: tasks.description,
        date: tasks.date,
        done: tasks.done,
        createdAt: tasks.createdAt.toISOString(),
        updatedAt: tasks.updatedAt.toISOString(),
      };
    })
  );
});

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const server: number = 3333;
app.listen(server, () => console.log(`Server is running on port ${server}`));