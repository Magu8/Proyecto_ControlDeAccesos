import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/taksService/task.service';
import { Tarea } from '../../model/tarea';
import { WorkersServiceService } from '../../services/workersService/workers-service.service';
import { Worker } from '../../model/worker';
import { FormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [DragDropModule, FormsModule, CdkAccordionModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  Completadas: Tarea[] = [];
  tareasJavi: Tarea[] = [];
  tareasMaria: Tarea[] = [];
  tareasMarkel: Tarea[] = [];
  workers: Worker[] = [];
  formulario: boolean = false;
  descripcion: string = '';
  constructor(private taskService: TaskService, private workerService: WorkersServiceService) { }
  ngOnInit(): void {
    this.workerService.allWorkers().subscribe((data) => {
      this.workers = data;
    })

    this.allTask();
  }

  newTaks(descripcion: string) {
    if (descripcion.length !== 0) {

      this.taskService.newTask(descripcion).subscribe((data) => {
        console.log(data);

      })
    }
    else {
      alert("rellena el campo")
    }
    this.allTask();
    this.formulario = false;

  }


  drop(event: CdkDragDrop<any>, id: string) {
    const draggedItemDescripcion = event.previousContainer.data[event.previousIndex]._id;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // Utiliza switchMap para esperar a que moverTarea se complete antes de llamar a allTask
      this.taskService.moverTarea(id, draggedItemDescripcion).pipe(
        switchMap(() => {
          // Retorna un observable con 'of' para asegurar que se complete antes de continuar
          return of(null);
        })
      ).subscribe(() => {
        // Se ejecutará después de que moverTarea se complete
        this.allTask();
      });
    }
  }

  eliminarTarea(id: string) {
    this.taskService.deleteTask(id).subscribe()
    this.allTask();
  }
  allTask() {
    this.taskService.allTasks().subscribe((data) => {
      this.tareas = [];
      this.Completadas = [];
      this.tareasJavi = [];
      this.tareasMaria = [];
      this.tareasMarkel = [];
      data.forEach((element: Tarea) => {

        if (element.completado == false && (element.responsable == null || typeof element.responsable !== "object")) {
          this.tareas.push(element)
        }
        else if (element.completado == true) {
          this.Completadas.push(element)
        }
        else if (element.responsable.nombre == "Maria Gerendiain Soler") {
          this.tareasMaria.push(element)
        }
        else if (element.responsable.nombre == "Markel Etxebarria Martin") {
          this.tareasMarkel.push(element)
        }
        else if (element.responsable.nombre == "Javier Rodríguez Callejo") {
          this.tareasJavi.push(element)
        }
      });

    })
  }


}
