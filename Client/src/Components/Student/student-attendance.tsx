import * as React from "react";
import { useState } from "react";
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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CalendarDays, LogOut, MoreVertical, Video } from "lucide-react";
import { useCookies } from "react-cookie";

// Mock data for attendance
const attendanceData = [
  {
    date: "2024-03-01",
    lectureNumber: 1,
    location: "Room 101",
    presence: "Present",
    content: "Introduction to React",
  },
  {
    date: "2024-03-03",
    lectureNumber: 2,
    location: "Room 102",
    presence: "Absent",
    content: "State and Props",
  },
  {
    date: "2024-03-05",
    lectureNumber: 3,
    location: "Room 103",
    presence: "Present",
    content: "Hooks and Effects",
  },
  {
    date: "2024-03-07",
    lectureNumber: 4,
    location: "Room 101",
    presence: "Present",
    content: "Routing in React",
  },
  {
    date: "2024-03-09",
    lectureNumber: 5,
    location: "Room 102",
    presence: "Late",
    content: "API Integration",
  },
];

export default function StudentAttendanceSystem() {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken", "Email"]);

  const handleLogout = () => {
    // Implement logout logic here
    //remove cookies and redirect
    //remove cookies
    removeCookie("authToken");
    removeCookie("Email");
    window.location.href = "/";
    console.log("Logging out...");
  };

  const handleContextMenuAction = (action: string, rowData: any) => {
    switch (action) {
      case "video":
        console.log("Opening video lecture for:", rowData);
        break;
      case "save":
        console.log("Saving attendance for:", rowData);
        break;
      case "report":
        console.log("Logging report for:", rowData);
        break;
    }
  };

  const [presenceFilter, setPresenceFilter] = useState<string | null>(null);

  const filteredAttendanceData = presenceFilter
    ? attendanceData.filter((row) => row.presence === presenceFilter)
    : attendanceData;

  const handlePresenceFilter = (filter: string) => {
    setPresenceFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Student Attendance System</h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-4">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">John Doe</h4>
                  <p className="text-sm">Student ID: 12345</p>
                  <p className="text-sm">Course: Computer Science</p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Joined September 2023
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8 p-4">
        <Card className="bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle>Attendance Record</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="PE1">
              <TabsList className="grid w-full grid-cols-5 bg-gray-700">
                <TabsTrigger
                  value="PE1"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  PE1
                </TabsTrigger>
                <TabsTrigger
                  value="PE2"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  PE2
                </TabsTrigger>
                <TabsTrigger
                  value="PE3"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  PE3
                </TabsTrigger>
                <TabsTrigger
                  value="PE4"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  PE4
                </TabsTrigger>
                <TabsTrigger
                  value="PE5"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  PE5
                </TabsTrigger>
              </TabsList>
              {["PE1", "PE2", "PE3", "PE4", "PE5"].map((pe) => (
                <TabsContent key={pe} value={pe}>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-gray-700">
                          <TableHead>Date</TableHead>
                          <TableHead>Lecture Number</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead
                            className="cursor-pointer"
                            onClick={() => handlePresenceFilter("Present")}
                          >
                            Presence
                            {presenceFilter === "Present" && " (Present)"}
                            {presenceFilter === "Absent" && " (Absent)"}
                          </TableHead>
                          <TableHead>Lecture Content</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAttendanceData.map((row, index) => (
                          <TableRow
                            key={index}
                            className="border-b border-gray-700"
                          >
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.lectureNumber}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{row.presence}</TableCell>
                            <TableCell>{row.content}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleContextMenuAction("video", row)
                                    }
                                  >
                                    <Video className="mr-2 h-4 w-4" />
                                    Go to video lecture
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleContextMenuAction("save", row)
                                    }
                                  >
                                    Save attendance
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleContextMenuAction("report", row)
                                    }
                                  >
                                    Log report
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
