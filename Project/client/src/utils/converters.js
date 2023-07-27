import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";
import dayjs from "dayjs";

function formatDateTime(dateString) {
	const date = new Date(dateString);
	const today = new Date();
	const formattedTime = format(date, "HH:mm");
  
	if (isToday(date)) {
	  const diffInMinutes = differenceInMinutes(today, date);
	  if (diffInMinutes <= 60) {
		return `${diffInMinutes} minutes ago`;
	  } else {
		return `Today at ${formattedTime}`;
	  }
	} else if (isYesterday(date)) {
	  return `Yesterday at ${formattedTime}`;
	} else {
	  const formattedDate = format(date, "dd MMM yyyy");
	  return `${formattedDate} at ${formattedTime}`;
	}
  }


function addMonthsOrYears(date, newExpiringRange) {
	let newDate = new Date(date);
	if (newExpiringRange.includes("Months")) {
		const months = parseInt(newExpiringRange.split(" ")[0]);
		newDate.setMonth(newDate.getMonth() + months);
	} else {
		const years = parseInt(newExpiringRange.split(" ")[0]);
		newDate.setFullYear(newDate.getFullYear() + years);
	}

	newDate = dayjs(newDate).format("YYYY-MM-DD");

	console.log(newDate);

	return newDate;
}

export { formatDateTime, addMonthsOrYears };
