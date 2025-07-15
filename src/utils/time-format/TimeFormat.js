import { formatDistanceToNow, differenceInSeconds } from "date-fns";


export const formatCustomTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const secondsAgo = differenceInSeconds(new Date(), date);

  // Show seconds if less than 60
  if (secondsAgo < 60) {
    return `${secondsAgo} secs ago`;
  }

  // Otherwise, use the default and customize the string
  let time = formatDistanceToNow(date, { addSuffix: true });

  // Replace "minutes" with "mins", "hours" with "hrs" etc.
  time = time.replace("minutes", "mins").replace("minute", "min");
  time = time.replace("hours", "hrs").replace("hour", "hr");
  
  return time;
};

