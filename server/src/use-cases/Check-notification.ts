import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICheckNotification {
    title: string;
    limitData: string;
}

export class Notification {
  constructor(private readonly daysInAdvanceForNotification: number) {

  }  

  async checkNotification( promise: Promise<ICheckNotification[]>): Promise<ICheckNotification[]> {
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


    if (!notification) {
      throw new Error("Notification not found");
    }

  
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
  
  
  