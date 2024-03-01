export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatDate(inputDate) {
	const dateObj = new Date(inputDate);

	const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(dateObj);

	return date;
}

export const timeDiff = (inputDate) => {
	const bidTime = new Date(inputDate);
	const currentTime = new Date();

	// Calculate time difference in milliseconds
	const timeDifference = bidTime.getTime() - currentTime.getTime();

	// Calculate minutes and seconds
	const minutes = Math.floor(timeDifference / (60 * 1000));
	const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

	return `${minutes}m ${seconds}s`;
};

export const dateDiff = (inputDate1: string, inputDate2: string) => {
	const date1 = new Date(inputDate1);
	const date2 = new Date(inputDate2);

	// Calculate the difference in milliseconds
	const timeDifference = Math.abs(date2 - date1);

	// Convert the time difference to hours and minutes
	const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
	const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds

	return `${hours}h ${minutes}m`;
};

export const formatDateByYear = (inputDate) => {
	const options: { [key: string]: string } = { month: "long", day: "numeric", year: "numeric" };
	const formattedDate = new Date(inputDate).toLocaleDateString("en-US", options);
	return formattedDate;
};
