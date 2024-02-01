import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToDo } from '../model/todo';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

  todolist: ToDo[] = [];
  form = this.formBuilder.group({
    task: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)]],
    done: [false]
  });

  constructor(private formBuilder: NonNullableFormBuilder) {
  }

  onAdd() {
    const todo = this.form.controls['task'].value;
    this.todolist.push({task: todo, done: false}); // (new ToDo(todo, false));
    this.form.reset();
  }

  onRemove(todo: ToDo) {
    const removedTask = this.todolist.indexOf(todo);
    this.todolist.splice(removedTask, 1);
  }

  markAsDone(todo: ToDo) {
    todo.done = true;
  }

  onValid(field: string) {
    const fieldText = this.form.get(field);
    if (fieldText?.hasError('required')) {
      return 'Obrigatório digitar pelo menos 1 caractere.';
    }
    if (fieldText?.hasError('minlength')) {
      const result: number = fieldText.errors ? fieldText.errors['minlength']['requiredLength'] : 3;
      return `Precisa de no mínimo ${result} caracteres para prosseguir/ criar!`;
    }
    if (fieldText?.hasError('maxlength')) {
      const result: number = fieldText.errors ? fieldText.errors['maxlength']['requiredLength'] : 50;
      return `Você passou de ${result} exigido!`
    }
    return 'Campo inválido!'
  }
}
