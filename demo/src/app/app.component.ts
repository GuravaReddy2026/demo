
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, CreateTaskRequest } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = '';
  description = '';

  tasks: Task[] = [];
  loading = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks. Please try again.';
        this.loading = false;
      }
    });
  }

  addTask(): void {
    const cleanTitle = this.title.trim();

    if (!cleanTitle || this.submitting) {
      return;
    }

    const request: CreateTaskRequest = {
      title: cleanTitle,
      description: this.description.trim()
    };

    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.taskService.createTask(request).subscribe({
      next: (createdTask) => {
        this.tasks = [createdTask, ...this.tasks];
        this.title = '';
        this.description = '';
        this.submitting = false;
        this.successMessage = 'Task created successfully.';
      },
      error: (error) => {
        this.errorMessage =
          error.status === 400
            ? 'Please provide a valid task title and description.'
            : 'Unable to create task. Please try again.';

        this.submitting = false;
      }
    });
  }
}