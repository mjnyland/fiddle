import React from "react";
import MainLayout from "../../components/MainLayout";
import CalendarView from "../../components/CalendarView";

export default function CalendarDayPage({
  params,
}: {
  params: { day: string };
}) {
  return (
    <MainLayout>
      <CalendarView day={params.day} />
    </MainLayout>
  );
}
