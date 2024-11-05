import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CalendarDays, ChevronDown, Home, LogOut } from "lucide-react";

// Mock data for courses
const courses = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Data Structures" },
];

export default function ProfessorDashboard() {
  const [activeView, setActiveView] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch attendance data for the selected course
  const fetchAttendance = async (course) => {
    setLoading(true);
    try {
      const response = await fetch(`/attendance?course=${course}`);
      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch attendance whenever selected course changes
  useEffect(() => {
    fetchAttendance(selectedCourse.name);
  }, [selectedCourse]);

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-purple-400">
            Professor Dashboard
          </h1>
          <nav>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-purple-400"
              onClick={() => setActiveView("home")}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-400"
                >
                  Check Attendance
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-900 text-gray-100"
              >
                {courses.map((course) => (
                  <DropdownMenuItem
                    key={course.id}
                    onSelect={() => {
                      setSelectedCourse(course);
                      setActiveView("attendance");
                    }}
                  >
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-purple-500 transition-all hover:ring-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Professor" />
          <AvatarFallback>PD</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8 p-4">
        {activeView === "home" && (
          <Card className="bg-gray-900 text-gray-100 shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-400">
                Welcome, Prof. David Lee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Select an option from the navigation bar to get started.</p>
            </CardContent>
          </Card>
        )}

        {activeView === "attendance" && (
          <Card className="bg-gray-900 text-gray-100 shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-purple-400">
                Attendance for {selectedCourse.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading attendance data...</p>
              ) : attendanceData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="text-purple-400">Date</TableHead>
                      <TableHead className="text-purple-400">
                        Lecture Number
                      </TableHead>
                      <TableHead className="text-purple-400">
                        Location
                      </TableHead>
                      <TableHead className="text-purple-400">Topic</TableHead>
                      <TableHead className="text-purple-400">Type</TableHead>
                      <TableHead className="text-purple-400">
                        Assignment
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((lecture) => (
                      <TableRow
                        key={lecture.id}
                        className="border-b border-gray-800 transition-all duration-200 hover:bg-gray-800/50 cursor-pointer"
                      >
                        <TableCell>{lecture.date}</TableCell>
                        <TableCell>{lecture.lectureNumber}</TableCell>
                        <TableCell>{lecture.location}</TableCell>
                        <TableCell>{lecture.topic}</TableCell>
                        <TableCell>{lecture.type}</TableCell>
                        <TableCell>{lecture.assignment || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No attendance data available for this course.</p>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
