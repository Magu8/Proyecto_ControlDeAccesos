import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { Worker } from '../../model/worker';
import { Registro } from '../../model/registro';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'registerWorker',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink],
  templateUrl: './register-worker.component.html',
  styleUrl: './register-worker.component.css',
})
export class RegisterWorkerComponent {
  private store = inject(Store);

  workers?: Worker[];
  registers?: Registro[];
  constructor(private workerLoginService: WorkersServiceService) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.perfilWorker();
    }
  }

  perfilWorker() {
    this.workerLoginService.allWorkers().subscribe((data) => {
      this.workers = data;
    });
  }

  registerWorker() {
    this.workerLoginService.allRegistros().subscribe((data) => {
      this.registers = data;
    });
  }
}
