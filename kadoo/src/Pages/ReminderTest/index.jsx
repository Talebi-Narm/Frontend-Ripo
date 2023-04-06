import * as React from 'react';
import Reminder from "../../Components/Reminder";

export default function ReminderTest() {
  const [value, setValue] = React.useState(new Date());

  return (
    <Reminder>

    </Reminder>
  );
}