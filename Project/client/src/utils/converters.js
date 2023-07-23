import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";

export function formatDate(dateString) {
	const date = new Date(dateString);
	const today = new Date();

	if (isToday(date)) {
		// Calculate the difference in minutes between the current date and the provided date
		const diffInMinutes = differenceInMinutes(today, date);
		if (diffInMinutes <= 60) {
			return `${diffInMinutes} minutes ago`;
		} else {
			// Handle other time formats as needed, e.g., "5 hours ago", "2 days ago", etc.
			// For simplicity, let's return the "today" date in a default format
			return format(date, "HH:mm");
		}
	} else if (isYesterday(date)) {
		return "Yesterday";
	} else {
		// Format the date as "01 Set 2021"
		return format(date, "dd MMM yyyy");
	}
}
