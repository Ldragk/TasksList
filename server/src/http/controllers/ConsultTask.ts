import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConsultTask {
  consultAllTasks = async (
    req: Request,
    res: {
      json: (
        arg0: {
          id: string;
          title: string;
          description: string;

          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => Response;
    }
  ) => {
    const tasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,

        done: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(tasks);
  };

  consultTasksMonth = async (
    req: { params: { month: number } },
    res: {
      json: (
        arg0: {
          title: string;
          description: string;

          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => Response;
    }
  ) => {
    const month = Number(req.params.month);

    const monthTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,

        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitMonth: month,
      },
    });
    return res.json(monthTasks);
  };

  consultTasksDay = async (
    req: { params: { day: number } },
    res: {
      json: (
        arg0: {
          title: string;
          description: string;

          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => Response;
    }
  ) => {
    const day = Number(req.params.day);

    const dayTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,

        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitDay: day,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(dayTasks);
  };

  contultDoneTasks = async (
    req: { params: { condition: string } },
    res: {
      json: (
        arg0: {
          title: string;
          description: string;

          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => Response;
    }
  ) => {
    const doneOrNot = Number(req.params.condition);
    const condition: boolean = doneOrNot === 1 ? true : false;
    const doneTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,

        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        done: condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(doneTasks);
  };

  consultDelayedTasks = async (
    req: Request,
    res: {
      send(arg0: string): unknown;
      json: (
        arg0: {
          title: string;
          description: string;
          date: string;
          done: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => JSON;
    }
  ) => {
    const delayedTasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        done: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(
      delayedTasks.filter((task) => new Date(task.date) < new Date(Date.now()))
    );
  };

  notificationOfTasksNearTheDeadline = async (
    req: { params: { daysOfDelay: number } },
    res: {
      json: (
        arg0: {
          id: string;
          title: string;
          description: string;
          done: boolean;
          createdAt: Date;
          updatedAt: Date;
          date: string;
        }[]
      ) => JSON;
    }
  ) => {
    const daysInAdvanceForNotification: number = req.params.daysOfDelay;
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
      where: {
        done: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const getDate = new Date().getDate();
    let getMonth = new Date().getMonth();
    const getYear = new Date().getFullYear();
    let getDay = getDate;

    if (getDate === numberOfDaysInTheMonth()) {
      getDay = 0 + Number(daysInAdvanceForNotification);
      getMonth += 1;
    } else if (getDate === (numberOfDaysInTheMonth() % getDate) + 1) {
      getDay =
        (numberOfDaysInTheMonth() % getDay) +
        Number(daysInAdvanceForNotification);

      if (getDay >= numberOfDaysInTheMonth()) {
        getDay = (getDay % numberOfDaysInTheMonth()) + 1;
        getMonth += 1;
      }
    } else {
      getDay += Number(daysInAdvanceForNotification);

      if (getDay >= numberOfDaysInTheMonth()) {
        getDay = getDay % numberOfDaysInTheMonth();
        getMonth += 1;
      }
    }
    const date = `${getMonth + 1}/${getDay}/${getYear}`;
    console.log(date);

    return res.json(tasks.filter((task) => date == task.date));
  };
}

function numberOfDaysInTheMonth() {
  let MonthDays: number = 31;
  const cathMonth: string = String(new Date()).split(" ")[1];
  if (
    cathMonth === "Apr" ||
    cathMonth === "Jun" ||
    cathMonth === "Sep" ||
    cathMonth === "Nov"
  ) {
    MonthDays = 30;
  } else if (cathMonth === "Feb") {
    MonthDays = 28;
  }
  return MonthDays;
}
