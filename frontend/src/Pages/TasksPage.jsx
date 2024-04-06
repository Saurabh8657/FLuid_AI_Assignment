
import TaskInput from "../Components/TaskInput";
import TasksTable from "../Components/TasksTable";


export default function TasksPage() {

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "auto", width: "90%", padding: "20px", justifyContent: "center", border: "1px solid black" }}>
        <TaskInput />
        <TasksTable />
      </div>
    </>
  );
}
