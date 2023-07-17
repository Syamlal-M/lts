import MonthList from "data/MonthList";

const convertToDateFormat = (date: string, format: "DD-MM-YYYY" | "YYYY-MM-DD"): string => {
  if (format === "YYYY-MM-DD") {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  } else {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }
};

const getFirstAndLastDates = (month: string, year: string) => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const firstDate = new Date(Number(year), monthIndex, 1);
  const lastDate = new Date(Number(year), monthIndex + 1, 0);

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return [formatDate(firstDate), formatDate(lastDate)];
};

function getNextMonthAndYear(monthYear: string) {
  const months = MonthList.map((month) => month.value);
  const [currentMonth, currentYear] = monthYear.split(" ");

  const currentMonthIndex = months.findIndex(
    (month) => month.toUpperCase() === currentMonth.toUpperCase()
  );
  const nextMonthIndex = (currentMonthIndex + 1) % 12;
  const nextYear = nextMonthIndex === 0 ? parseInt(currentYear) + 1 : currentYear;

  return `${months[nextMonthIndex]} ${nextYear}`;
}

export { convertToDateFormat, getFirstAndLastDates, getNextMonthAndYear };
