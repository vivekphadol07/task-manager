const Task = require("../models/Task");
const User = require("../models/User");
const excelJs = require("exceljs");

//@desc Export All task as an excel files
//@route GET /api/report/export/tasks
//@access Private(Admin)
const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 40 },
        ];

        tasks.forEach((task) => {
            const assignedTo = task.assignedTo?.length
                ? task.assignedTo.map(u => `${u.name} (${u.email})`).join(", ")
                : "Unassigned";

            worksheet.addRow({
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : "N/A",
                assignedTo,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="task_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: "Error exporting tasks",
            error: error.message,
        });
    }
};

//@desc Export user-task report as an excel files
//@route GET /api/report/export/users
//@access Private(Admin)
const exportUsersReport = async (req, res) => {
    try {
        const users = await User.find().select("name email _id").lean();
        const tasks = await Task.find().populate("assignedTo", "_id");

        const userTaskMap = {};

        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });

        tasks.forEach((task) => {
            task.assignedTo?.forEach((assignedUser) => {
                const user = userTaskMap[assignedUser._id];
                if (!user) return;

                user.taskCount++;

                if (task.status === "Pending") user.pendingTasks++;
                if (task.status === "In Progress") user.inProgressTasks++;
                if (task.status === "Completed") user.completedTasks++;
            });
        });

        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet("Users Task Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 40 },
            { header: "Total Assigned Tasks", key: "taskCount", width: 25 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
            { header: "Completed Tasks", key: "completedTasks", width: 20 },
        ];

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="user_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: "Error exporting users report",
            error: error.message,
        });
    }
};


module.exports = {
    exportTasksReport,
    exportUsersReport,
};