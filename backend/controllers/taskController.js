const Task = require("../models/Task");
const { all } = require("../routes/authRoutes");

// @desc Get all task (Admin : all, User: only assigned tasks)
// @route GET /api/tasks/
// access Private
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let tasks;

        if (req.user.role == "admin") {
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user.id }).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        // Add completed todoChecklist count to each task
        tasks = await Promise.all(
            tasks.map(async (task) => {
                const todoChecklist = task.todoChecklist || [];
                const completedCount = todoChecklist.filter(
                    (item) => item.completed
                ).length;
                return { ...task._doc, completedTodoCount: completedCount };
            })
        );
        // Status summary counts
        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        });

        res.status(200).json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// @desc Get task by id
// @route GET /api/tasks/:id
// access Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
        if (!task) {
            return res
                .status(404)
                .json({
                    message: "Task not found"
                });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// @desc Create new task ( admin only)
// @route POST /api/tasks/
// access Private (Admin)
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body;

        if (!Array.isArray(assignedTo)) {
            return res
                .status(400)
                .json({
                    message: "assingedTo must be an array of user IDs"
                });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoChecklist,
            attachments,
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Update task details
// @route PUT /api/tasks/:id
// access Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update fields
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        // Validate assignedTo
        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res
                    .status(400)
                    .json({ message: "assignedTo must be an array of user IDs" });
            }
            task.assignedTo = req.body.assignedTo;
        }

        const updatedTask = await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// @desc    Delete a Task (admin only)
// @route   DELETE /api/tasks/:id
// @access Private (admin)
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res
                .status(404)
                .json({
                    message: "Task not found",
                });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Update task Status
// @route PUT /api/tasks/:id/status
// access Private
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Authorization check
        const isAssigned =
            Array.isArray(task.assignedTo) &&
            task.assignedTo.some(
                (userId) => userId.toString() === req.user._id.toString()
            );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        task.status = status || task.status;

        // Auto-complete logic
        if (task.status === "Completed") {
            if (Array.isArray(task.todoChecklist)) {
                task.todoChecklist.forEach((item) => {
                    item.completed = true;
                });
            }
            task.progress = 100;
        }

        await task.save();

        res.status(200).json({
            message: "Task status updated successfully",
            task,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// @desc Update task checklist
// @route PUT /api/tasks/:id/todo
// access Private
const updateTaskChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const { todoChecklist } = req.body;

        if (!Array.isArray(todoChecklist)) {
            return res.status(400).json({
                message: "todoChecklist must be an array",
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Authorization check
        const isAssigned =
            Array.isArray(task.assignedTo) &&
            task.assignedTo.some(
                (userId) => userId.toString() === req.user._id.toString()
            );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({
                message: "Not authorized to update checklist",
            });
        }

        // Update checklist
        task.todoChecklist = todoChecklist;

        // Auto-calculate progress
        const totalItems = task.todoChecklist.length;
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length;

        task.progress =
            totalItems > 0
                ? Math.round((completedCount / totalItems) * 100)
                : 0;

        // Auto-update task status
        if (task.progress === 100) {
            task.status = "Completed";
        } else if (task.progress > 0) {
            task.status = "In Progress";
        } else {
            task.status = "Pending";
        }

        await task.save();

        const updatedTask = await Task.findById(id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        res.status(200).json({
            message: "Task checklist updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// @desc Dashboard data (admin only)
// @route GET /api/tasks/dashboard-data
// access Private
const getDashboardData = async (req, res) => {
    try {
        //STATISTICS
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "Pending" });
        const completedTasks = await Task.countDocuments({ status: "Completed" });
        const overdueTasks = await Task.countDocuments({
            status: { $ne: "Completed" },
            dueDate: { $lt: new Date() },
        });

        //TASK STATUS DISTRIBUTION 
        const taskStatuses = ["Pending", "In Progress", "Completed"];

        const taskDistributionRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] =
                taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});

        taskDistribution.All = totalTasks;

        //PRIORITY DISTRIBUTION 
        const taskPriorities = ["Low", "Medium", "High"];

        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] =
                taskPriorityLevelsRaw.find(
                    (item) => item._id === priority
                )?.count || 0;
            return acc;
        }, {});

        // RECENT TASKS
        const recentTasks = await Task.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        //RESPONSE 
        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,
            },
            recentTasks,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// @desc Dashboard data (User-specific)
// @route Get /api/tasks/user-dashboard-data
// access Private
const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; //Only fetch data for the logged-in user

        // Fetch statictics For user-specific tasks
        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "Pending" });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "Completed" });
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: { $ne: "Completed" },
            dueDate: { $lt: new Date() },
        });

        //TASK STATUS DISTRIBUTION 
        const taskStatuses = ["Pending", "In Progress", "Completed"];

        const taskDistributionRaw = await Task.aggregate([
            { $match : { assignedTo : userId }},
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const formattedKey = status.replace(/\s+/g, "");
            acc[formattedKey] =
                taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});

        taskDistribution.All = totalTasks;

        //PRIORITY DISTRIBUTION 
        const taskPriorities = ["Low", "Medium", "High"];

        const taskPriorityLevelsRaw = await Task.aggregate([
            { $match : { assignedTo : userId }},
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] =
                taskPriorityLevelsRaw.find(
                    (item) => item._id === priority
                )?.count || 0;
            return acc;
        }, {});

        // RECENT TASKS
        const recentTasks = await Task.find({ assignedTo : userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        //RESPONSE 
        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,
            },
            recentTasks,
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData
};