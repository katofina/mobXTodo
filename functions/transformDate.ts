import { DateType } from "react-native-ui-datepicker";

export default function transformDate(date: DateType) {
  if (date) {
    const newDate = new Date(date.toString());
    const day = newDate.getDate().toString();
    const rightDay = day.length < 2 ? "0" + day : day;
    const changedDate =
      rightDay + "." + (newDate.getMonth() + 1) + "." + newDate.getFullYear();
    return changedDate;
  }
  return;
}
