// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDo {
    struct Task {
        string name;
        bool isCompleted;
        uint256 createdAt;
    }
    
    // Mapping from user address to their array of tasks
    mapping(address => Task[]) private userTasks;
    
    // Events
    event TaskCreated(address indexed user, uint256 taskId, string name);
    event TaskUpdated(address indexed user, uint256 taskId, string newName);
    event TaskCompleted(address indexed user, uint256 taskId);
    event TaskDeleted(address indexed user, uint256 taskId);
    
    // Create a new task
    function createTask(string memory _name) public {
        Task memory newTask = Task({
            name: _name,
            isCompleted: false,
            createdAt: block.timestamp
        });
        
        userTasks[msg.sender].push(newTask);
        emit TaskCreated(msg.sender, userTasks[msg.sender].length - 1, _name);
    }
    
    // Get a specific task for the caller
    function getTask(address _user, uint256 _taskId) public view returns (Task memory) {
        require(_taskId < userTasks[_user].length, "Task does not exist");
        return userTasks[_user][_taskId];
    }
    
    // Get all tasks for the caller
    function getAllTasks(address _user) public view returns (Task[] memory) {
        return userTasks[_user];
    }
    
    // Update task name
    function updateTaskName(uint256 _taskId, string memory _newName) public {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");
        userTasks[msg.sender][_taskId].name = _newName;
        emit TaskUpdated(msg.sender, _taskId, _newName);
    }
    
    // Complete a task
    function completeTask(uint256 _taskId) public {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");
        require(!userTasks[msg.sender][_taskId].isCompleted, "Task already completed");
        
        userTasks[msg.sender][_taskId].isCompleted = true;
        emit TaskCompleted(msg.sender, _taskId);
    }
    
    // Get total number of tasks for the caller
    function getTaskCount(address _user) public view returns (uint256) {
        return userTasks[_user].length;
    }
    
    // Delete a task
    function deleteTask(uint256 _taskId) public {
        require(_taskId < userTasks[msg.sender].length, "Task does not exist");
        
        // Move the last element to the position we want to delete
        // (unless we're deleting the last element)
        if (_taskId < userTasks[msg.sender].length - 1) {
            userTasks[msg.sender][_taskId] = userTasks[msg.sender][userTasks[msg.sender].length - 1];
        }
        
        // Remove the last element
        userTasks[msg.sender].pop();
        
        emit TaskDeleted(msg.sender, _taskId);
    }
}