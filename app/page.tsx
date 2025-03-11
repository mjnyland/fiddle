import MainLayout from "./components/MainLayout";
import CalendarView from "./components/CalendarView";

export default function Home() {
  return (
    <MainLayout>
      <CalendarView day="6" />
    </MainLayout>
  );
}
